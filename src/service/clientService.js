'use strict';

const constants = require('../constants');

const clients = [];

/**
 * Maps a list of clients based on environment
 *
 **/
const getClientsFromEnvironment = ({config}) => {
  const maxNodes = 9;
  for (let i = 1; i <= maxNodes; i++) {
    const enabled = process.env[`NODE${i}_ENABLED`];
    if (!enabled) {
      continue;
    }

    const url = process.env[`NODE${i}_LTO_URL`];
    if (!url) {
      continue;
    }

    let networkId = process.env[`NODE${i}_NETWORK_ID`];
    if (!networkId) {
      networkId = constants.MAINNET_KEY;
    }

    const client = {
      enabled,
      url,
      networkId,
    };

    console.log(`Enabled LTO Network '${client.networkId}' using node '${client.url}'`);
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
    networkId: constants.MAINNET_KEY,
  });
  clients.push({
    enabled: true,
    url: process.env.LTO_DEFAULT_URL_TESTNET || config.defaultUrlTestnet,
    networkId: constants.TESTNET_KEY,
  });
};

module.exports = {
  clients,
  getClientsFromEnvironment,
};
