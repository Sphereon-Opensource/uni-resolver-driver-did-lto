'use strict';

const utils = require('../utils/writer.js');
const didService = require('../service/didService');

module.exports.resolve = function resolve (req, res, next, identifier, accept) {
  didService.resolve(identifier, accept)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
