'use strict';

const axios = require('axios');
const constants = require('../utils/constants');
const clientService = require('./clientService');

/**
 * Resolve a DID or other identifier.
 *
 * identifier String A DID or other identifier to be resolved.
 * accept String The requested MIME type of the DID document or DID resolution result. (optional)
 * returns Object
 **/
exports.resolve = (identifier, accept) => {
  return new Promise((resolve, reject) => {
    const startTime = new Date();

    // match identifier to lto did pattern
    const match = identifier.match(constants.DID_LTO_METHOD_PATTERN);
    if (!match) {
      const msg = `Identifier does not match LTO pattern. Identifier: ${identifier}`;
      console.error(msg);
      resolve({code: 400, payload: msg});
      return;
    }

    // get network id
    const networkId = getNetworkId(identifier);
    if (!networkId) {
      const msg = `Could not get network id for identifier: ${identifier}`;
      console.error(msg);
      resolve({code: 400, payload: msg});
      return;
    }

    // get client
    const client = getClient(networkId);
    if (!client) {
      const msg = `Could not get identity client for network with id: ${identifier}`;
      console.error(msg);
      resolve({code: 400, payload: msg});
    }
    const nodeAddress = client.url;

    const targetIdentifier = getTargetIdentifier(identifier);

    // get did document
    getDidDocument(nodeAddress, targetIdentifier)
      .then(response => {
        // wrap did document in did resolution result
        const didResolutionResult = createDidResolutionResult(targetIdentifier, response, networkId, nodeAddress, startTime);
        resolve({code: 200, payload: didResolutionResult});
      })
      .catch(error => {
        if (error.response.status === 500) {
          if (error.response.data.includes('NotFoundError')) {
            resolve({code: 404, payload: `Identifier not found: ${targetIdentifier}`});
            return;
          }
          resolve({code: 400, payload: error.response.data});
          return;
        }

        resolve({code: error.response.status, payload: error.response.data})
      })
  });
};

/**
 * Retrieves the network ID from default (MAINNET) or did
 *
 * identifier String A DID or other identifier to be resolved.
 * returns Network ID
 **/
const getNetworkId = identifier => {
  const parts = identifier.split(':');
  if (parts.length > 3) {
    return parts[2].toLowerCase();
  }

  return constants.MAINNET_KEY;
};

/**
 * Retrieves the target identifier from the provided identifier param
 *
 * identifier String A DID or other identifier to be resolved.
 * returns Identifier
 **/
const getTargetIdentifier = identifier => {
  const parts = identifier.split(':');
  if (parts.length > 3) {
    parts.splice(2, 1);
    return parts.join(':');
  }

  return identifier;
};


/**
 * Retrieves the DID document from the LTO identity node
 *
 * node_address String An address to a LTO identity node.
 * identifier String A DID or other identifier to be resolved.
 * returns DID document object
 **/
const getDidDocument = (nodeAddress, identifier) => {
  const url = nodeAddress + constants.RESOLVE_ENDPOINT + identifier;
  return axios.get(url)
    .then(response => response.data)
};

/**
 * Creates the DID resolution result
 *
 * didDocument object A DID document
 * networkId String The network name used to retrieve the DID document
 * node_address String The node used to retrieve the DID document
 * startTime Date The start time of the resolution process
 * returns DID Resolution result object
 **/
const createDidResolutionResult = (identifier, didDocument, networkId, nodeAddress, startTime) => {
  const didResolutionResult = {
    '@context': 'https://w3id.org/did-resolution/v1',
    didDocument: {...didDocument},
    resolverMetadata: {...createResolverMetadata(identifier, startTime, nodeAddress)},
    methodMetadata: {...createMethodMetadata(networkId, nodeAddress)},
  };

  return didResolutionResult;
};

/**
 * Creates the DID resolution metadata
 *
 * startTime Date The start time of the resolution process
 * returns DID Resolution metadata object
 **/
const createResolverMetadata = (identifier, startTime, nodeAddress) => {
  return {
    startTime,
    duration: new Date() - startTime,
    method: 'lto',
    didUrl: `${nodeAddress}/${identifier}`,
    driverId: 'Sphereon/driver-did-lto',
    vendor: 'LTO',
  }
};

/**
 * Creates the DID document metadata
 *
 * networkId String The network name used to retrieve the DID document
 * node_address String The node used to retrieve the DID document
 * returns DID document metadata object
 **/
const createMethodMetadata = (networkId, nodeAddress) => {
  return {
    network: networkId.toUpperCase(),
    ltoNode: nodeAddress,
  }
};

/**
 * Retrieves client based on network ID
 *
 * networkId String The network name used to retrieve the DID document
 * returns Client object
 **/
const getClient = networkId => {
  return clientService.clients.find(client => client.networkId === networkId);
};
