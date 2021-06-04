'use strict';

const constants = require('../utils/constants');

const clients = [];

/**
 * Maps a list of clients based on environment
 *
 **/
const getClientsFromEnvironment = () => {
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

    clients.push(client)
  }

  if (clients.length == 0) {
    console.warn('No LTO networks defined in environment. Using default mainnet and testnet values');
    addDefaultClients();
  }
};

/**
 * Adds the default clients to the clients list
 *
 **/
const addDefaultClients = () => {
  clients.push({
    enabled: true,
    url: constants.URL_MAINNET,
    networkId: constants.MAINNET_KEY,
  });
  clients.push({
    enabled: true,
    url: constants.URL_TESTNET,
    networkId: constants.TESTNET_KEY,
  });
};

module.exports = {
  clients: clients,
  getClientsFromEnvironment,
};
