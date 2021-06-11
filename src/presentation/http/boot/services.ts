import { asFunction, AwilixContainer } from 'awilix';
import { Application } from 'express';
import CreateUser from '../../../application/user/CreateUser';
import ListUsers from '../../../application/user/ListUsers';
import logger from '../../../lib/logger';

const services = async (app: Application, container: AwilixContainer) => {
  logger.info('Bootstraping services');
  
  container.register({
    createUser: asFunction(CreateUser),
    listUsers: asFunction(ListUsers)
  });
}

export default services;