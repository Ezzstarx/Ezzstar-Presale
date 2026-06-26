const { ethers } = require('ethers');

class FallbackProvider {
  constructor(urls, chainId = 97) {
    if (!urls || urls.length === 0) {
      throw new Error('No RPC URLs provided to FallbackProvider');
    }
    
    this.chainId = chainId;
    this.activeIdx = 0;
    
    // Statically define the network to prevent background auto-detection on initialization
    const staticNetwork = new ethers.Network('bsc-testnet', chainId);

    this.providers = urls.map((url) => {
      console.log(`[RPC Provider] Initializing provider for: ${url}`);
      return {
        url,
        provider: new ethers.JsonRpcProvider(url, staticNetwork, {
          staticNetwork: true
        }),
        isHealthy: true,
        lastChecked: null
      };
    });

    this.startHealthChecks();
  }

  // Get current active provider
  getActiveProviderState() {
    return this.providers[this.activeIdx];
  }

  // Rotate to the next provider index
  rotateProvider() {
    const oldUrl = this.providers[this.activeIdx].url;
    this.activeIdx = (this.activeIdx + 1) % this.providers.length;
    const newUrl = this.providers[this.activeIdx].url;
    console.info(`[RPC Provider] Switch: rotating active provider from ${oldUrl} -> ${newUrl}`);
  }

  // Wrapper that executes RPC operations with timeout and fallback
  async requestWithFallback(fn, maxRetriesCount = 3) {
    const timeoutMs = 6000; // 6 seconds timeout per request
    const totalProviders = this.providers.length;
    const maxAttempts = totalProviders * maxRetriesCount;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const state = this.providers[this.activeIdx];

      // Check if current provider is healthy. If there are healthy providers,
      // skip this one if it's unhealthy. Otherwise, attempt it anyway.
      const hasHealthyProvider = this.providers.some(p => p.isHealthy);
      if (hasHealthyProvider && !state.isHealthy) {
        this.rotateProvider();
        continue;
      }

      try {
        // Execute request with timeout
        const result = await Promise.race([
          fn(state.provider),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error(`RPC request timeout after ${timeoutMs}ms`)), timeoutMs)
          )
        ]);

        // Mark as healthy if it succeeded
        if (!state.isHealthy) {
          console.info(`[RPC Provider] Recovery: provider ${state.url} has recovered and is marked healthy.`);
          state.isHealthy = true;
        }

        return result;
      } catch (error) {
        console.warn(`[RPC Provider Warning] Request to ${state.url} failed (Attempt ${attempt + 1}/${maxAttempts}): ${error.message}`);
        
        // Mark provider unhealthy
        state.isHealthy = false;

        // Switch to the next provider
        this.rotateProvider();

        // If we've completed a full cycle through all providers, wait for a backoff delay
        if ((attempt + 1) % totalProviders === 0) {
          const cycleNumber = Math.floor((attempt + 1) / totalProviders);
          const backoffDelay = Math.min(Math.pow(2, cycleNumber) * 1000, 10000); // Max 10s backoff
          console.warn(`[RPC Provider] All providers failed in this cycle. Retrying cycle in ${backoffDelay}ms...`);
          await new Promise(resolve => setTimeout(resolve, backoffDelay));
        }
      }
    }

    throw new Error('All configured RPC providers failed.');
  }

  // Start periodic health checks (eth_blockNumber + chain ID checks)
  startHealthChecks() {
    const intervalMs = 30000; // 30 seconds
    
    this.healthCheckTimer = setInterval(async () => {
      for (const state of this.providers) {
        try {
          // Perform lightweight network queries
          const network = await state.provider.getNetwork();
          const currentChainId = Number(network.chainId);
          
          if (currentChainId !== Number(this.chainId)) {
            if (state.isHealthy) {
              console.error(`[RPC Health Check] Provider ${state.url} chain ID mismatch: got ${currentChainId}, expected ${this.chainId}. Marking unhealthy.`);
              state.isHealthy = false;
            }
            continue;
          }

          // Check block number
          await state.provider.getBlockNumber();
          
          if (!state.isHealthy) {
            console.info(`[RPC Health Check] Provider ${state.url} is now healthy.`);
            state.isHealthy = true;
          }
          state.lastChecked = new Date();
        } catch (error) {
          if (state.isHealthy) {
            console.warn(`[RPC Health Check] Provider ${state.url} check failed: ${error.message}. Marking unhealthy.`);
            state.isHealthy = false;
          }
        }
      }
    }, intervalMs);

    // Prevent blocking process termination
    if (this.healthCheckTimer.unref) {
      this.healthCheckTimer.unref();
    }
  }

  // Exposed provider functions mapped to fallback
  async getBlockNumber() {
    return this.requestWithFallback(provider => provider.getBlockNumber());
  }

  async getBlock(blockNumber, prefetchTxs = false) {
    return this.requestWithFallback(provider => provider.getBlock(blockNumber, prefetchTxs));
  }

  async getTransaction(txHash) {
    return this.requestWithFallback(provider => provider.getTransaction(txHash));
  }

  async getTransactionReceipt(txHash) {
    return this.requestWithFallback(provider => provider.getTransactionReceipt(txHash));
  }

  // Get status for API / monitoring
  getStatus() {
    return {
      activeUrl: this.providers[this.activeIdx].url,
      providers: this.providers.map(p => ({
        url: p.url,
        isHealthy: p.isHealthy,
        lastChecked: p.lastChecked
      }))
    };
  }

  // Clean up timer
  destroy() {
    if (this.healthCheckTimer) {
      clearInterval(this.healthCheckTimer);
    }
  }
}

module.exports = FallbackProvider;
