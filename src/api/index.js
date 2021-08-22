import {Router} from 'express';
import resolver from './resolver';
// import apiInfo from '../resources/apiInfo';


export default ({config}) => {
  let api = Router();
  // perhaps expose some API metadata at the root
  api.get('/', (req, res) => {
    res.redirect('/api-docs');
  });


  // mount the issuer resource
  api.use('/1.0/identifiers', resolver({config}));
/*

  // mount the verifier resource
  api.use('/verify', verifier({config}));

  // mount the holder resource
  api.use('/prove', holder({config}));

  // mount the revocation resource
  api.use('/revocations', passport.authenticate('bearer', {session: false}), revocation({config}));

  // mount the mongo credential resource
  api.use('/credentials', credentials({config}));

  // mount authentication resource
  api.use('/auth', auth({config}));
*/


  return api;
}
