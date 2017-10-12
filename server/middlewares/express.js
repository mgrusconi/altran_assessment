'use strict';

/**
 * Modulo que contiene la implementacion de Express.
 * Module containing the Express implementation.
 *
 * @module
 * @author Marcelo G. Rusconi <mgrusconi@gmail.com>
 */

import express from 'express';
import swaggerConfig from './swagger';
import swaggerUi from 'swagger-ui-express';
import routings from '../modules/v1/app/app-routing';

function expressApp() {
    
  // App
  const app = express();

  // Request Authentocation middleware should be above methodOverride
  app.all('/api/*', [require('./validateRequest')]);

  //Routing
  app.use('/api/', routings);

  // Swagger
  app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerConfig));

  return app;
}

module.exports = expressApp();