import { Router } from 'express'
import { Injector } from '../../../../lib/Injector';
import createUserHandler from './createUserHandler';
import listUsersHandler from './listUsersHandler';

const userController = ({ inject }: Injector) => {
  const router = Router();

  router.get('/', inject(listUsersHandler));
  router.post('/', inject(createUserHandler));

  return router;
}

export default userController;