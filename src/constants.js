'use strict';

const DID_LTO_METHOD_PATTERN = '^did:lto:.+'
const MAINNET_KEY = 'L'
const TESTNET_KEY = 'T'
const MAINNET_CHAINID = MAINNET_KEY.charCodeAt(0)
const TESTNET_CHAINID = TESTNET_KEY.charCodeAt(0)
const RESOLVE_ENDPOINT = '/identities/'

module.exports = {
  DID_LTO_METHOD_PATTERN,
  MAINNET_KEY,
  TESTNET_KEY,
  MAINNET_CHAINID,
  TESTNET_CHAINID,
  RESOLVE_ENDPOINT,
}
