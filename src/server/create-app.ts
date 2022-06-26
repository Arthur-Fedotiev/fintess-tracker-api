import express, { Express } from 'express';
import path from 'path';
import { useLogger } from '../app/shared/utils/use-logger';
import projectDependencies from '../dependencies/project-dependencies';
import { errorHandler } from '../frameworks/common/error/error-handler';
import { useSecure } from '../frameworks/common/secure/use-secure';
import { apiRouter } from '../frameworks/web/routes';

export const createApp = async (): Promise<Express> => {
  const app = express();

  useLogger(app);
  useSecure(app);

  app.use(express.static(path.join(__dirname, 'public')));

  app.use(express.json());
  app.use('/', apiRouter(projectDependencies));
  app.use(errorHandler);

  return app;
};
