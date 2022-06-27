import projectDependencies from './dependencies/project-dependencies';
import { registerServerShutdownListeners } from './server/close-server';
import { AppLogger } from './frameworks/common/log/winston-logger';
import { createApp } from './server/create-app';
import { createServer } from './server/create-server-on-port';

projectDependencies.DatabaseService.connect()
  .then(projectDependencies.AuthService.init)
  .then(createApp)
  .then(createServer)
  .then(registerServerShutdownListeners)
  .catch((err: unknown) => {
    AppLogger.error(err);

    process.exit(1);
  });
