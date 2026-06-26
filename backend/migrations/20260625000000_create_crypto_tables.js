/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  // 1. Create watched_addresses table
  await knex.schema.createTable('watched_addresses', (table) => {
    table.string('address', 42).primary().notNullable(); // Lowercase address
    table.string('user_id', 255).nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    
    table.unique(['address']);
  });

  // 2. Create crypto_transactions table
  await knex.schema.createTable('crypto_transactions', (table) => {
    table.increments('id').primary();
    table.string('tx_hash', 66).unique().notNullable();
    table.string('from_address', 42).notNullable();
    table.string('to_address', 42).notNullable();
    table.specificType('value_wei', 'numeric(78, 0)').notNullable(); // supports uint256
    table.specificType('value_tbnb', 'numeric(38, 18)').notNullable(); // supports 18 decimal places
    table.bigInteger('block_number').notNullable();
    table.integer('confirmations').notNullable().defaultTo(0);
    table.string('status', 20).notNullable();
    table.integer('chain_id').defaultTo(97);
    table.string('network', 50).defaultTo('bsc-testnet');
    table.jsonb('raw_payload').nullable();
    table.string('user_id', 255).nullable();
    table.string('order_id', 255).nullable();
    table.timestamps(true, true); // created_at, updated_at

    // Indices for faster queries
    table.index(['from_address']);
    table.index(['to_address']);
    table.index(['status']);

    // Check constraint for valid statuses
    table.check(`status IN ('pending', 'confirmed', 'failed')`, [], 'chk_status');
  });

  // 3. Create sync_state table
  await knex.schema.createTable('sync_state', (table) => {
    table.integer('id').primary().defaultTo(1); // Single row pattern
    table.bigInteger('last_processed_block').notNullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('sync_state');
  await knex.schema.dropTableIfExists('crypto_transactions');
  await knex.schema.dropTableIfExists('watched_addresses');
};
