import { asFunction, AwilixContainer } from 'awilix';
import { Application } from 'express';
import MongoUserRepository from '../../../infrastructure/MongoUserRepository';
import logger from '../../../lib/logger';

const repositories = async (app: Application, container: AwilixContainer) => {
  logger.info('Bootstraping repositories');

  container.register({
    userRepository: asFunction(MongoUserRepository)
  });
}

export default repositories;