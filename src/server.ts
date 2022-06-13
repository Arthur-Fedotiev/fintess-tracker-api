import express from 'express';
import { ENV_CONFIG } from './env-config';
import { useLogger } from './app/shared/utils/use-logger';

import 'reflect-metadata';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const c = require('colors');
import colors from 'colors';

import projectDependencies from './dependencies/project-dependencies';
import { apiRouter } from './frameworks/web/routes';
import { Server } from 'http';

const app = express();
const PORT = ENV_CONFIG.port;

projectDependencies.DatabaseService.connect()
  .then(() => {
    useLogger(app);
    app.use(express.json());
    app.use('/', apiRouter(projectDependencies));

    const server = app.listen(PORT, () =>
      console.log(
        `⚡ Server running in ${ENV_CONFIG.env} mode on port ${ENV_CONFIG.port}`
          .yellow.bold,
      ),
    );

    process.on('unhandledRejection', closeServer(server));
  })
  .catch((err: unknown) => {
    console.log(`db is not ready, err:${err}`);
  });

function closeServer(server: Server): (err: Error) => void {
  return (err: Error): void => {
    console.log(`Error: ${err.message}`.red);

    /**
     * Close server and exit process
     */
    server.close(() => process.exit(1));
  };
}
