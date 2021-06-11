import { Request, Response } from 'express';
import Joi from 'joi';
import { CreateUserService } from '../../../../application/user/CreateUser';
import runAsync from '../../../../lib/runAsync';
import validator from '../../../../lib/validator';

interface Dependencies {
  createUser: CreateUserService
}

interface CreateUserDTO {
  username: string;
}

const createUserHandler = ({ createUser }: Dependencies) => {
  const { getBody } = validator({
    body: Joi.object({
      username: Joi.string().required()
    }),
  });

  return runAsync(async (req: Request, res: Response) => {
    const { username } = getBody<CreateUserDTO>(req);

    const id = await createUser({ username });

    res.json({ id });
  })
}

export default createUserHandler;