import { asValue, createContainer } from 'awilix';
import { Application } from 'express';
import init from '../../../lib/Init';
import config from '../config';
import database from './database';
import errorHandler from './errorHandler';
import express from './express';
import repositories from './repositories';
import routes from './routes';
import services from './services';

async function bootstrap(app: Application): Promise<void> {
  const container = createContainer();

  container.register({
    config: asValue(config)
  });

  const bootChain = init([express, database, repositories, services, routes, errorHandler]);

  await bootChain(app, container, config);
}

export default bootstrap;

