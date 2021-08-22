'use strict';
import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
// import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import middleware from './middleware';
import api from './api';
import config from './config.json';
import {getClientsFromEnvironment} from "./service/clientService";

// const path = require('path');
// const http = require('http');

// const oas3Tools = require('oas3-tools');

// const clients = require('./service/clientService');
getClientsFromEnvironment({config});

let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
  exposedHeaders: config.corsHeaders
}));


// internal middleware
app.use(middleware({config}));

// swagger ui
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(YAML.load('./src/resources/openapi/openapi.yaml')));

// api router
app.use('/', api({config}));

app.server.listen(process.env.PORT || config.port, () => {
  console.log(`Started on port ${app.server.address().port}`);
});

export default app;
