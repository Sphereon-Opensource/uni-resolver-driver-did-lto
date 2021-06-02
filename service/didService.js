'use strict';

const axios = require('axios');
const constants = require('../utils/constants');

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
      resolve(400);
      return;
    }

    // get network id
    const networkId = getNetworkId(identifier);
    if (!networkId) {
      resolve(500);
      return;
    }

    // get node url (MAINNET /TESTNET)
    const nodeAddress = networkId === constants.MAINNET_KEY ? constants.URL_MAINNET : constants.URL_TESTNET;
    if (!nodeAddress) {
      resolve(500);
      return;
    }

    const targetIdentifier = getTargetIdentifier(identifier);

    // get did document
    getDidDocument(nodeAddress, targetIdentifier)
      .then(response => {
        // wrap did document in did resolution result
        const didResolutionResult = createDidResolutionResult(targetIdentifier, response, networkId, nodeAddress, startTime);
        resolve(didResolutionResult)
      })
      .catch(() => resolve(500))
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
  //const url = nodeAddress + constants.RESOLVE_ENDPOINT + identifier;
  const url = 'https://api.github.com/repos/atom/atom/license';
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
    method: "lto",
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
