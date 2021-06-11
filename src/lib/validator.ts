import Joi from 'joi';
import pino from 'pino';
import { Request } from 'express';

const logger = pino();

interface ValidationSchemas {
  body?: Joi.Schema;
  params?: Joi.Schema;
  query?: Joi.Schema;
  headers?: Joi.Schema;
  cookies?: Joi.Schema;
}

interface ValidationHelpers {
  getBody<T>(req: Request): T;
  getParams<T>(req: Request): T;
  getQuery<T>(req: Request): T;
  getCookies<T>(req: Request): T;
  getHeaders<T>(req: Request): T;
}

export class ValidationError extends Error {
  public readonly errors;
  public readonly error;
  public readonly target;

  constructor({
    target,
    errors,
    error,
  }: {
    target: string;
    errors?: Joi.ValidationError;
    error?: Joi.ValidationError;
  }) {
    super();
    this.target = target;
    this.errors = errors;
    this.error = error;
  }
}

function validator(schemas: ValidationSchemas): ValidationHelpers {
  const createValidator = (key: 'body' | 'params' | 'query' | 'headers' | 'cookies') => <T>(req: Request): T => {
    if (!schemas[key]) {
      return req[key];
    }

    const { value, error, errors, warning } = (schemas[key] as Joi.Schema).validate(req[key]);

    if (errors || error) {
      logger.error({ errors, error });
      throw new ValidationError({ target: key, error, errors });
    }

    if (warning) {
      logger.warn(warning);
    }

    return value as T;
  };

  return {
    getBody: createValidator('body'),
    getParams: createValidator('params'),
    getQuery: createValidator('query'),
    getHeaders: createValidator('headers'),
    getCookies: createValidator('cookies'),
  };
}

export default validator;
