import { AwilixContainer } from 'awilix';

export interface Injector {
  inject: <T>(target: (dependencies: any) => T) => T;
  withContainer: <T>(target: (container: AwilixContainer) => T) => T;
  withInjector: <T>(target: (injector: Injector) => T) => T;
  container: AwilixContainer;
}

function injectorFor(container: AwilixContainer): Injector {
  return {
    inject: (target) => target(container.cradle),
    withContainer: (target) => target(container),
    withInjector: (target) => target(injectorFor(container)),
    container,
  };
}

export default injectorFor;
