'use strict';

const networkNameEnum = Object.freeze({'MAINNET': 'mainnet', 'TESTNET':'testnet',});
module.exports.networkNameEnum = networkNameEnum;

exports.getValue = key => {
  return networkNameEnum[key.toUpperCase()];
};
