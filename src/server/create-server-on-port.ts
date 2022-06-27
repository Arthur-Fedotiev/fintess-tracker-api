import { Server } from 'http';
import { Express } from 'express';
import { AppLogger } from '../frameworks/common/log/winston-logger';
import { ENV_CONFIG } from '../env-config';

export const createServer = (app: Express): Server => {
  const port = ENV_CONFIG.port;
  const env = ENV_CONFIG.env;

  const server = app.listen(port, () =>
    AppLogger.info(`⚡${env} server running on port ${port}`),
  );

  return server;
};
