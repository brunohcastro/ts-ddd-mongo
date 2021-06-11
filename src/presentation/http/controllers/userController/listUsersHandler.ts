import { Request, Response } from 'express';
import { ListUsersService } from '../../../../application/user/ListUsers';
import runAsync from '../../../../lib/runAsync';

interface Dependencies {
  listUsers: ListUsersService
}

const listUsersHandler = ({ listUsers }: Dependencies) => {
  return runAsync(async (req: Request, res: Response) => {
    const users = await listUsers();

    res.json(users);
  })
}

export default listUsersHandler;