import logger from './lib/logger';
import { appFactory } from './presentation';

appFactory().then(app => app.start()).catch(logger.error);