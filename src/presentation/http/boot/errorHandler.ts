import { Application, NextFunction, Request, Response } from 'express';
import logger from '../../../lib/logger';
import { ValidationError } from '../../../lib/validator';

const errorHandler = async (app: Application) => {
  logger.info('Bootstraping errorHandler');

  app.use((req, res) => {
    logger.info("No matched route");

    res.sendStatus(404);
  });

  app.use(<T extends Error>(err: T, req: Request, res: Response, _: NextFunction) => {
    logger.error(err);

    if (err instanceof ValidationError) {
      res.status(400).json({ status: 422, error: "Unprocessable Entity", message: err });
    } else {
      res.status(500).json({ status: 500, error: "Unknown Error", message: err.message });
    }
  });
}

export default errorHandler;