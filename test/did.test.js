const assert = require('assert');
const nock = require('nock');
const constants = require('../utils/constants');
const didService = require('../service/didService');

describe('LTO did pattern match', () => {
  it('identifier should match pattern without network id', () => {
    const identifier = 'did:lto:3JugjxT51cTjWAsgnQK4SpmMqK6qua1VpXH';
    assert(identifier.match(constants.DID_LTO_METHOD_PATTERN))
  });
  it('identifier should match pattern with network id', () => {
    const identifier = 'did:lto:testnet:3JugjxT51cTjWAsgnQK4SpmMqK6qua1VpXH';
    assert(identifier.match(constants.DID_LTO_METHOD_PATTERN))
  });
  it('identifier should not match pattern with other did method', () => {
    const identifier = 'did:other:3JugjxT51cTjWAsgnQK4SpmMqK6qua1VpXH';
    assert.equal(identifier.match(constants.DID_LTO_METHOD_PATTERN), null)
  });
  it('identifier should not match pattern with other scheme', () => {
    const identifier = 'other:lto:3JugjxT51cTjWAsgnQK4SpmMqK6qua1VpXH';
    assert.equal(identifier.match(constants.DID_LTO_METHOD_PATTERN), null)
  });
});

describe('Resolve identifier', () => {
  const testDidDocument = {
    '@context': 'https://www.w3.org/ns/did/v1',
    'id': 'did:lto:3JugjxT51cTjWAsgnQK4SpmMqK6qua1VpXH',
    'verificationMethod': [
      {
        'id': 'did:lto:3JugjxT51cTjWAsgnQK4SpmMqK6qua1VpXH#key',
        'type': 'Ed25519VerificationKey2018',
        'controller': 'did:lto:3JugjxT51cTjWAsgnQK4SpmMqK6qua1VpXH',
        'publicKeyBase58': 'mMyJxTQuXW9bQVLmJeCrWNCSKzsEMkbZQ3xuNavj6Mk',
      }
    ],
    'authentication': [
      'did:lto:3JugjxT51cTjWAsgnQK4SpmMqK6qua1VpXH#key'
    ],
    'assertionMethod': [
      'did:lto:3JugjxT51cTjWAsgnQK4SpmMqK6qua1VpXH#key'
    ],
    'capabilityInvocation': [
      'did:lto:3JugjxT51cTjWAsgnQK4SpmMqK6qua1VpXH#key'
    ]
  };

  it('identifier should resolve to did resolution result without a network id', async () => {
    nock('https://api.github.com')
      .get('/repos/atom/atom/license')
      .reply(200, testDidDocument);

    const identifier = 'did:lto:3JugjxT51cTjWAsgnQK4SpmMqK6qua1VpXH';

    // nock(constants.URL_MAINNET)
    //   .get(constants.RESOLVE_ENDPOINT + identifier)
    //   .reply(200, testDidDocument);

    await execute(identifier);
  });
  it('identifier should resolve to did resolution result with a network id', async () => {
    nock('https://api.github.com')
      .get('/repos/atom/atom/license')
      .reply(200, testDidDocument);

    const identifier = 'did:lto:testnet:3JugjxT51cTjWAsgnQK4SpmMqK6qua1VpXH';

    // nock(constants.URL_TESTNET)
    //   .get(constants.RESOLVE_ENDPOINT + identifier)
    //   .reply(200, testDidDocument);

    await execute(identifier);
  });

  const execute = async identifier => {
    const didResolutionResult = await didService.resolve(identifier);

    assert.equal(didResolutionResult.hasOwnProperty('@context'), true);
    assert.equal(didResolutionResult.hasOwnProperty('didDocument'), true);
    assert.equal(didResolutionResult.hasOwnProperty('resolverMetadata'), true);
    assert.equal(didResolutionResult.hasOwnProperty('methodMetadata'), true);
  }
});
