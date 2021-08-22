import {Router} from 'express';

// import utils = require('../utils/writer.js');
import didService from '../service/didService';

export default ({config}) => {
  let api = Router();

  api.get('/:identifier', (req, res) => {
    const {identifier, accept} = req.params;

    didService.resolve(identifier, accept)
    .then(function (response) {
      res.status(200).send(response);
    })
    .catch(function (response) {
      res.status(400).send(response);
    });

  });

  return api;
}


  /*module.exports.resolve = (req, res, next, identifier, accept) => {
    didService.resolve(identifier, accept)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
  };
*/
