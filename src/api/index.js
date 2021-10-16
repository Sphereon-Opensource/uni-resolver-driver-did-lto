import {Router} from 'express';
import resolver from './resolver';

export default ({config}) => {
  let api = Router();
  // perhaps expose some API metadata at the root
  api.get('/', (req, res) => {
    res.redirect('/api-docs');
  });


  // mount the issuer resource
  api.use('/1.0/identifiers', resolver({config}));

  return api;
}
