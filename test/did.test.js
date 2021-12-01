import assert from 'assert';
import nock from 'nock';
import constants from '../src/constants';
import didService from '../src/service/didService';
import config from '../src/config.json';
import {getClientsFromEnvironment} from "../src/service/clientService";

getClientsFromEnvironment({config});

describe('LTO did pattern match', () => {
  it('identifier should match pattern without network id', () => {
    const identifier = 'did:lto:3JugjxT51cTjWAsgnQK4SpmMqK6qua1VpXH';
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

describe('Resolve mocked identifier', () => {
  const didDocument =
      {
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
  const resResult = {
    didDocument,
    resolutionResult: {},
    methodMetadata: {}
  }

  it('identifier should resolve to did resolution result without a network id', async () => {
    const identifier = 'did:lto:3JugjxT51cTjWAsgnQK4SpmMqK6qua1VpXH';

    nock(process.env.DEFAULT_URL_MAINNET || config.defaultUrlMainnet)
      .get(constants.RESOLVE_ENDPOINT + identifier)
      .reply(200, resResult);

    await execute(identifier);
    nock.cleanAll();
  });


  const execute = async identifier => {
    const didResolutionResult = await didService.resolve(identifier);

    assert.equal(didResolutionResult.hasOwnProperty('didDocument'), true);
    // assert.equal(didResolutionResult.didDocument.hasOwnProperty('@context'), true);
    assert.equal(didResolutionResult.hasOwnProperty('resolverMetadata'), true);
    assert.equal(didResolutionResult.hasOwnProperty('methodMetadata'), true);
  }
});

describe('Resolve identifier', () => {
  it('identifier should resolve to did resolution result without a network id', async () => {
    const identifier = 'did:lto:3N39xg4xauubonEWf2BUCp1DmGGQ3U21jJT';
    await execute(identifier);
  });


  const execute = async identifier => {
    const didResolutionResult = await didService.resolve(identifier);
    assert.equal(didResolutionResult.hasOwnProperty('didDocument'), true);
    assert.equal(didResolutionResult.didDocument.hasOwnProperty('@context'), true);
    assert.equal(didResolutionResult.hasOwnProperty('resolverMetadata'), true);
    assert.equal(didResolutionResult.hasOwnProperty('methodMetadata'), true);
  }
});
