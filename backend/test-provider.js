const FallbackProvider = require('./services/blockchain/provider');

async function runTests() {
  console.log('--- STARTING FALLBACK PROVIDER VERIFICATION ---');

  // 1. Test standard fallback provider initialization
  const healthyUrls = [
    'https://bsc-testnet-dataseed.bnbchain.org',
    'https://bsc-testnet.bnbchain.org',
    'https://data-seed-prebsc-1-s1.bnbchain.org:8545'
  ];

  console.log('\n[Test 1] Testing with healthy providers...');
  const provider = new FallbackProvider(healthyUrls, 97);
  
  try {
    const blockNumber = await provider.getBlockNumber();
    console.log(`[SUCCESS] Retrieved latest block number: ${blockNumber}`);
    const status = provider.getStatus();
    console.log(`[Status] Active URL: ${status.activeUrl}`);
    status.providers.forEach(p => console.log(` - ${p.url}: healthy=${p.isHealthy}`));
  } catch (error) {
    console.error('[FAILURE] Failed to fetch block number:', error.message);
  }
  provider.destroy();

  // 2. Test failover behavior
  // We place a dead URL first. It should log a failure, switch to the second, and successfully complete.
  console.log('\n[Test 2] Testing failover (first URL is dead)...');
  const mixedUrls = [
    'https://this-is-a-completely-dead-rpc-url.org', // Dead URL
    'https://bsc-testnet-dataseed.bnbchain.org',    // Healthy URL
    'https://bsc-testnet.bnbchain.org'              // Healthy URL
  ];

  const failoverProvider = new FallbackProvider(mixedUrls, 97);

  try {
    console.log('Requesting block number (should print a warning and rotation log)...');
    const blockNumber = await failoverProvider.getBlockNumber();
    console.log(`[SUCCESS] Retrieved latest block number via failover: ${blockNumber}`);
    const status = failoverProvider.getStatus();
    console.log(`[Status] Active URL (should be index 1): ${status.activeUrl}`);
    status.providers.forEach(p => console.log(` - ${p.url}: healthy=${p.isHealthy}`));
  } catch (error) {
    console.error('[FAILURE] Failover failed:', error.message);
  }
  failoverProvider.destroy();

  console.log('\n--- VERIFICATION COMPLETE ---');
}

runTests();
