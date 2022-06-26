import { Express } from 'express';
import { ENV_CONFIG } from './env-config';

import projectDependencies from './dependencies/project-dependencies';
import { closeServer } from './server/close-server';
import { AppLogger } from './frameworks/common/log/winston-logger';
import { createApp } from './server/create-app';

const PORT = ENV_CONFIG.port;

projectDependencies.DatabaseService.connect()
  .then(projectDependencies.AuthService.init)
  .then(createApp)
  .then((app: Express) => {
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
