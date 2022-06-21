import express from 'express';
import { ENV_CONFIG } from './env-config';
import { useLogger } from './app/shared/utils/use-logger';

import 'reflect-metadata';

import projectDependencies from './dependencies/project-dependencies';
import { apiRouter } from './frameworks/web/routes';
import { errorHandler } from './frameworks/common/error/error-handler';
import { closeServer } from './close-server';
import { AppLogger } from './frameworks/common/log/winston-logger';
import { useSecure } from './frameworks/common/secure/use-secure';
import path from 'path';

const app = express();
const PORT = ENV_CONFIG.port;

projectDependencies.DatabaseService.connect()
  .then(projectDependencies.AuthService.init)
  .then(() => {
    useLogger(app);
    useSecure(app);

    app.use(express.static(path.join(__dirname, 'public')));

    app.use(express.json());
    app.use('/', apiRouter(projectDependencies));
    app.use(errorHandler);

    const server = app.listen(PORT, () =>
      AppLogger.info(
        `⚡${ENV_CONFIG.env} server running on port ${ENV_CONFIG.port}`,
      ),
    );

    process.on('unhandledRejection', closeServer(server));
    process.on('uncaughtException', closeServer(server));
  })
  .catch((err: unknown) => {
    AppLogger.error(err);

    process.exit(1);
  });
