import { AwilixContainer } from 'awilix';
import { promises } from 'dns';
import { Application } from 'express';

export type InitFunction<T> = (app: Application, container: AwilixContainer, config: T) => void;

const init = <T>(fns: InitFunction<T>[]) => async (app: Application, container: AwilixContainer, config: T) =>
  await fns.reduce((chain, fn) => chain.then(() => fn(app, container, config)), Promise.resolve());

export default init;