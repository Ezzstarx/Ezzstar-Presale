const db = require('../config/db');

// Helper to retry database operations with exponential backoff
async function withRetry(operation, retries = 5, delay = 1000) {
  try {
    return await operation();
  } catch (error) {
    if (retries <= 0) throw error;
    console.warn(`[Database Write Warning] Operation failed, retrying in ${delay}ms... Error: ${error.message}`);
    await new Promise(resolve => setTimeout(resolve, delay));
    return withRetry(operation, retries - 1, delay * 2);
  }
}

class CryptoTransactionRepository {
  // Get all watched addresses
  async getWatchedAddresses() {
    return withRetry(() => db('watched_addresses').select('*'));
  }

  // Add a watched address
  async addWatchedAddress(address, user_id = null) {
    const lowerAddress = address.toLowerCase();
    return withRetry(() => 
      db('watched_addresses')
        .insert({ address: lowerAddress, user_id })
        .onConflict('address')
        .merge({ user_id })
    );
  }

  // Remove a watched address
  async removeWatchedAddress(address) {
    const lowerAddress = address.toLowerCase();
    return withRetry(() => 
      db('watched_addresses')
        .where({ address: lowerAddress })
        .del()
    );
  }

  // Get the last processed block
  async getLastProcessedBlock() {
    const row = await withRetry(() => 
      db('sync_state')
        .where({ id: 1 })
        .first()
    );
    return row ? Number(row.last_processed_block) : null;
  }

  // Save the last processed block
  async saveLastProcessedBlock(blockNumber) {
    return withRetry(() => 
      db('sync_state')
        .insert({ id: 1, last_processed_block: blockNumber, updated_at: db.fn.now() })
        .onConflict('id')
        .merge({ last_processed_block: blockNumber, updated_at: db.fn.now() })
    );
  }

  // Upsert a transaction
  async upsertTransaction(txData) {
    return withRetry(() => 
      db('crypto_transactions')
        .insert(txData)
        .onConflict('tx_hash')
        .merge({
          confirmations: db.raw('EXCLUDED.confirmations'),
          status: db.raw('EXCLUDED.status'),
          raw_payload: db.raw('EXCLUDED.raw_payload'),
          updated_at: db.fn.now()
        })
    );
  }

  // Get transactions with pending status
  async getPendingTransactions() {
    return withRetry(() => 
      db('crypto_transactions')
        .where({ status: 'pending' })
        .select('*')
    );
  }

  // Update confirmations and status of a transaction
  async updateTransactionConfirmations(tx_hash, status, confirmations) {
    return withRetry(() => 
      db('crypto_transactions')
        .where({ tx_hash })
        .update({
          status,
          confirmations,
          updated_at: db.fn.now()
        })
    );
  }

  // Update status (e.g. mark failed)
  async updateTransactionStatus(tx_hash, status) {
    return withRetry(() => 
      db('crypto_transactions')
        .where({ tx_hash })
        .update({
          status,
          updated_at: db.fn.now()
        })
    );
  }

  // Manually link order and user to a transaction
  async linkTransactionOrder(tx_hash, order_id, user_id) {
    return withRetry(() => 
      db('crypto_transactions')
        .where({ tx_hash })
        .update({
          order_id,
          user_id,
          updated_at: db.fn.now()
        })
    );
  }

  // Get all recorded transactions (optionally filter by address)
  async getTransactions(limit = 100, offset = 0) {
    return withRetry(() => 
      db('crypto_transactions')
        .orderBy('block_number', 'desc')
        .limit(limit)
        .offset(offset)
        .select('*')
    );
  }
}

module.exports = new CryptoTransactionRepository();
