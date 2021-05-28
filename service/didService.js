'use strict';

const axios = require('axios');
const networkNameEnum = require('../service/networkNameEnum');

/**
 * Resolve a DID or other identifier.
 *
 * identifier String A DID or other identifier to be resolved.
 * accept String The requested MIME type of the DID document or DID resolution result. (optional)
 * returns Object
 **/
exports.resolve = function(identifier, accept) {
  return new Promise(function(resolve, reject) {
    const startTime = Date.now();

    let networkId = networkNameEnum.networkNameEnum.MAINNET;
    const parts = identifier.split(":");
    if (parts.length > 3) {
      networkId = networkNameEnum.getValue(parts[2]);
      if (!networkId) {
        resolve(500); // TODO make more descriptive
        return;
      }
    }

    const node_address = networkId === networkNameEnum.networkNameEnum.MAINNET ? process.env.uniresolver_driver_did_lto_url_mainnet : process.env.uniresolver_driver_did_lto_url_testnet;
    if (!node_address) {
      resolve(500); // TODO make more descriptive
      return;
    }

    // match identifier to lto did pattern
    const match = identifier.match(process.env.uniresolver_driver_did_lto_method_pattern);
    if (!match) {
      resolve(400) // TODO make more descriptive
    }

    getDidDocumentMock(node_address, identifier)
      .then(response => {
        const didResolutionResult = createDidResolutionResult(response, networkId, node_address, startTime);
        resolve(didResolutionResult)
      })
      .catch(() => resolve(500))
  });
};

/**
 * Retrieves the DID document from the LTO identity node
 *
 * node_address String An address to a LTO identity node.
 * identifier String A DID or other identifier to be resolved.
 * returns DID document object
 **/
const getDidDocument = (node_address, identifier) => {
  const url = node_address + process.env.uniresolver_driver_did_lto_resolve_endpoint;
  return axios.get(url)
    .then(response => response.data)
};

const getDidDocumentMock = (node_address, identifier) => {
  return new Promise((resolve, reject) => {
    resolve(
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
        }
    );
  });
};

/**
 * Creates the DID resolution result
 *
 * didDocument object A DID document
 * networkName String The network name used to retrieve the DID document
 * node_address String The node used to retrieve the DID document
 * startTime Date The start time of the resolution process
 * returns DID Resolution result object
 **/
const createDidResolutionResult = (didDocument, networkName, node_address, startTime) => {
  const didResolutionResult = {
    '@context': 'https://w3id.org/did-resolution/v1',
    didDocument: {...didDocument},
    resolverMetadata: {...createResolverMetadata(startTime)},
    methodMetadata: {...createMethodMetadata(networkName, node_address)},
  };

  return didResolutionResult;
};

/**
 * Creates the DID resolution metadata
 *
 * startTime Date The start time of the resolution process
 * returns DID Resolution metadata object
 **/
const createResolverMetadata = startTime => {
  return {
    startTime,
    duration: Date.now() - startTime,
    method: "lto",
    didUrl: '',
    driverId: '',
    vendor: 'lto',
    version: '',
  }
};

/**
 * Creates the DID document metadata
 *
 * networkName String The network name used to retrieve the DID document
 * node_address String The node used to retrieve the DID document
 * returns DID document metadata object
 **/
const createMethodMetadata = (networkName, node_address) => {
  return {
    network: networkName.toUpperCase(),
    ltoNode: node_address,
  }
};

