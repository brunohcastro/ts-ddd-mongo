import { AwilixContainer } from 'awilix';
import { Application, json, urlencoded } from 'express';
import httpLogger from 'pino-http';
import logger from '../../../lib/logger';
import { Configuration } from '../config';

const express = async (app: Application, container: AwilixContainer, config: Configuration) => {
  logger.info('Bootstraping express');
  
  app.use(httpLogger());
  app.use(json());
  app.use(urlencoded({ extended: false }));

  app.set('host', config.server.host);
  app.set('port', config.server.port);
}

export default express;