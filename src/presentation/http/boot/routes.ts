import { AwilixContainer } from 'awilix';
import { Application, Router } from 'express';
import injectorFor from '../../../lib/Injector';
import logger from '../../../lib/logger';
import userController from '../controllers/userController';

const routes = async (app: Application, container: AwilixContainer) => {
  logger.info('Bootstraping routes');

  const rootRouter = Router();

  const { withInjector } = injectorFor(container);

  rootRouter.use('/users', withInjector(userController));

  app.use(rootRouter);
}

export default routes;