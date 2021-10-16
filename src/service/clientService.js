'use strict';

const constants = require('../constants');

const clients = [];

/**
 * Maps a list of clients based on environment
 *
 **/
const getClientsFromEnvironment = ({config}) => {
  const maxNodes = 9
  for (let i = 1; i <= maxNodes; i++) {
    const enabled = process.env[`NODE${i}_ENABLED`]
    if (!enabled) {
      continue
    }

    const url = process.env[`NODE${i}_LTO_URL`]
    if (!url) {
      continue
    }

    const networkId = process.env[`NODE${i}_NETWORK_ID`]
    let chainId = networkId
    if (!networkId || networkId.toUpperCase() === constants.MAINNET_KEY || networkId.toLowerCase() === 'mainnet') {
      chainId = constants.MAINNET_CHAINID
    } else if (networkId.toUpperCase() === constants.TESTNET_KEY || networkId.toLowerCase() === 'testnet') {
      chainId = constants.TESTNET_CHAINID
    }

    const client = {
      enabled,
      url,
      chainId,
    }

    console.log(`Enabled LTO Network '${client.chainId}' using node '${client.url}'`);
    clients.push(client)
  }

  if (clients.length == 0) {
    console.warn('No LTO networks defined in environment. Using default mainnet and testnet values');
    addDefaultClients({config});
  }
};

/**
 * Adds the default clients to the clients list
 *
 **/
const addDefaultClients = ({config}) => {
  clients.push({
    enabled: true,
    url: process.env.LTO_DEFAULT_URL_MAINNET || config.defaultUrlMainnet,
    chainId: constants.MAINNET_CHAINID,
  });
  clients.push({
    enabled: true,
    url: process.env.LTO_DEFAULT_URL_TESTNET || config.defaultUrlTestnet,
    chainId: constants.TESTNET_CHAINID,
  });
};

module.exports = {
  clients,
  getClientsFromEnvironment,
};
