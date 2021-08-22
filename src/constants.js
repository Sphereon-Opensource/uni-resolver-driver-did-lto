'use strict';

const DID_LTO_METHOD_PATTERN = '^did:lto:.+';

// Moved to config.json:
// const DEFAULT_URL_MAINNET = 'https://lto-indexer-test.test.sphereon.io'; // TODO, move to url: 'https://nodes.lto.network/indexer';
// const DEFAULT_URL_TESTNET = 'https://lto-indexer-test.test.sphereon.io'; // TODO, move to url: 'https://testnet.lto.network/indexer';

const MAINNET_KEY = 'mainnet';
const TESTNET_KEY = 'testnet';
const RESOLVE_ENDPOINT = '/identities/';

module.exports = {
  DID_LTO_METHOD_PATTERN,
  MAINNET_KEY,
  TESTNET_KEY,
  RESOLVE_ENDPOINT,
};
