const { ethers } = require('ethers');

class BlockchainListener {
  constructor(provider, repository, options = {}) {
    this.provider = provider;
    this.repository = repository;
    this.pollInterval = options.pollIntervalMs || 3000;
    this.confirmationBlocks = options.confirmationBlocks || 6;
    this.chainId = options.chainId || 97;
    this.network = options.network || 'bsc-testnet';
    this.isPolling = false;
    this.timer = null;
  }

  // Start polling
  async start() {
    if (this.isPolling) return;
    this.isPolling = true;
    console.info('[Blockchain Listener] Starting block polling service...');
    this.poll();
  }

  // Stop polling
  stop() {
    this.isPolling = false;
    if (this.timer) {
      clearTimeout(this.timer);
    }
    console.info('[Blockchain Listener] Stopped block polling service.');
  }

  // Polling loop execution
  async poll() {
    if (!this.isPolling) return;

    try {
      const latestBlock = await this.provider.getBlockNumber();
      let lastProcessedBlock = await this.repository.getLastProcessedBlock();

      if (lastProcessedBlock === null) {
        // First run: initialize to latestBlock
        lastProcessedBlock = latestBlock;
        await this.repository.saveLastProcessedBlock(lastProcessedBlock);
        console.info(`[Blockchain Listener] Initialized last processed block to: ${lastProcessedBlock}`);
      }

      if (latestBlock > lastProcessedBlock) {
        // Sync blocks sequentially (max 10 blocks per poll cycle to prevent overwhelming)
        const toBlock = Math.min(latestBlock, lastProcessedBlock + 10);
        console.info(`[Blockchain Listener] Syncing blocks from ${lastProcessedBlock + 1} to ${toBlock} (Latest: ${latestBlock})`);
        
        for (let currentBlock = lastProcessedBlock + 1; currentBlock <= toBlock; currentBlock++) {
          await this.processBlock(currentBlock);
          await this.repository.saveLastProcessedBlock(currentBlock);
        }
      }

      // Check pending transactions confirmations
      await this.checkPendingTransactions(latestBlock);

    } catch (error) {
      console.error('[Blockchain Listener Error] Error in poll cycle:', error);
    } finally {
      // Schedule next run
      this.timer = setTimeout(() => this.poll(), this.pollInterval);
    }
  }

  // Scan block for watched addresses
  async processBlock(blockNumber) {
    try {
      // Fetch block with transactions.
      // ethers v6: provider.getBlock(blockNumber, true) will prefetch transactions.
      const block = await this.provider.getBlock(blockNumber, true);
      if (!block || !block.transactions) {
        return;
      }

      // Load watched addresses dynamically
      const watched = await this.repository.getWatchedAddresses();
      if (watched.length === 0) return;

      const watchedSet = new Set(watched.map(w => w.address.toLowerCase()));

      for (const txOrHash of block.transactions) {
        let tx;
        if (typeof txOrHash === 'string') {
          tx = await this.provider.getTransaction(txOrHash);
        } else {
          tx = txOrHash;
        }

        if (!tx) continue;

        const from = tx.from ? tx.from.toLowerCase() : null;
        const to = tx.to ? tx.to.toLowerCase() : null;

        const isFromWatched = from && watchedSet.has(from);
        const isToWatched = to && watchedSet.has(to);

        if (isFromWatched || isToWatched) {
          console.info(`[Blockchain Listener] Mined Transaction found: ${tx.hash} in block ${blockNumber}`);

          // Fetch receipt to verify status (revert or success)
          const receipt = await this.provider.getTransactionReceipt(tx.hash);
          
          // Match user_id if registered
          let matchedUserId = null;
          if (isFromWatched) {
            const match = watched.find(w => w.address.toLowerCase() === from);
            if (match) matchedUserId = match.user_id;
          }
          if (isToWatched && !matchedUserId) {
            const match = watched.find(w => w.address.toLowerCase() === to);
            if (match) matchedUserId = match.user_id;
          }

          // Initial status setup: if reverted (receipt.status === 0), it's failed
          let status = 'pending';
          if (receipt && receipt.status === 0) {
            status = 'failed';
          }

          const rawPayload = {
            tx: {
              hash: tx.hash,
              from: tx.from,
              to: tx.to,
              value: tx.value.toString(),
              gasLimit: tx.gasLimit.toString(),
              gasPrice: tx.gasPrice ? tx.gasPrice.toString() : null,
              nonce: tx.nonce,
              data: tx.data,
              blockNumber: tx.blockNumber,
              blockHash: tx.blockHash
            },
            receipt: receipt ? {
              status: receipt.status,
              gasUsed: receipt.gasUsed.toString(),
              blockNumber: receipt.blockNumber,
              blockHash: receipt.blockHash
            } : null
          };

          const txData = {
            tx_hash: tx.hash,
            from_address: tx.from,
            to_address: tx.to,
            value_wei: tx.value.toString(),
            value_tbnb: ethers.formatEther(tx.value),
            block_number: blockNumber,
            confirmations: 1, // Mined in this block
            status: status,
            chain_id: this.chainId,
            network: this.network,
            raw_payload: rawPayload,
            user_id: matchedUserId,
            order_id: null
          };

          // Record or Update transaction (idempotent upsert)
          await this.repository.upsertTransaction(txData);
          console.info(`[Blockchain Listener] Recorded tx ${tx.hash} as status '${status}'`);
        }
      }
    } catch (error) {
      console.error(`[Blockchain Listener Error] Failed to process block ${blockNumber}:`, error);
      throw error; // Re-throw to pause syncing and retry on next cycle
    }
  }

  // Handle reorgs & confirmation updates
  async checkPendingTransactions(latestBlock) {
    try {
      const pendingTxs = await this.repository.getPendingTransactions();
      if (pendingTxs.length === 0) return;

      for (const tx of pendingTxs) {
        try {
          const receipt = await this.provider.getTransactionReceipt(tx.tx_hash);
          
          if (!receipt) {
            // Receipt is missing entirely from canonical chain
            console.warn(`[Blockchain Listener] Pending tx ${tx.tx_hash} receipt is missing from chain. Marking as failed.`);
            await this.repository.updateTransactionConfirmations(tx.tx_hash, 'failed', 0);
            continue;
          }

          // Fetch the block at receipt.blockNumber to verify it is canonical
          const canonicalBlock = await this.provider.getBlock(receipt.blockNumber);
          if (!canonicalBlock || canonicalBlock.hash !== receipt.blockHash) {
            // Block hash mismatch: reorg out of canonical chain
            console.warn(`[Blockchain Listener] Pending tx ${tx.tx_hash} block hash mismatch (${receipt.blockHash} vs canonical ${canonicalBlock ? canonicalBlock.hash : 'none'}). Marking as failed.`);
            await this.repository.updateTransactionConfirmations(tx.tx_hash, 'failed', 0);
            continue;
          }

          // Check if execution failed (reverted on-chain)
          if (receipt.status === 0) {
            console.warn(`[Blockchain Listener] Pending tx ${tx.tx_hash} execution reverted. Marking as failed.`);
            await this.repository.updateTransactionConfirmations(tx.tx_hash, 'failed', 0);
            continue;
          }

          // Calculate confirmations
          const confirmations = Number(latestBlock) - Number(receipt.blockNumber) + 1;
          const status = confirmations >= this.confirmationBlocks ? 'confirmed' : 'pending';

          // Update confirmations & status
          await this.repository.updateTransactionConfirmations(tx.tx_hash, status, confirmations);
          
          if (status === 'confirmed') {
            console.info(`[Blockchain Listener] Confirmed: tx ${tx.tx_hash} has reached ${confirmations} confirmations. Status updated.`);
            this.handleDownstreamCreditFlow(tx);
          } else {
            console.info(`[Blockchain Listener] Pending: tx ${tx.tx_hash} updated to ${confirmations} confirmations.`);
          }
        } catch (error) {
          console.error(`[Blockchain Listener Error] Failed checking pending tx ${tx.tx_hash}:`, error);
        }
      }
    } catch (error) {
      console.error('[Blockchain Listener Error] Error checking pending transactions:', error);
    }
  }

  // Triggers downstream credit/top-up flow
  handleDownstreamCreditFlow(tx) {
    if (tx.user_id) {
      console.info(`[Blockchain Listener] Downstream credit flow triggered for user '${tx.user_id}', tx '${tx.tx_hash}', value ${tx.value_tbnb} tBNB.`);
      // In production, this can invoke a billing web service or event bus.
    } else {
      console.info(`[Blockchain Listener] Confirmed tx ${tx.tx_hash} has no registered user_id, skipping credit trigger.`);
    }
  }
}

module.exports = BlockchainListener;
