import morgan from 'morgan';
import { Express } from 'express';
import { ENV_CONFIG } from '../../env-config';
import { NodeEnvEnum } from '../constants/node-env.enum';

export const useLogger = (app: Express): void => {
  ENV_CONFIG.env === NodeEnvEnum.Dev && app.use(morgan('dev'));
};
