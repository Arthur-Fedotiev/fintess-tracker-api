import { Server } from 'http';
import { AppLogger } from './frameworks/common/log/winston-logger';

export const closeServer =
  (server: Server): ((err: Error) => void) =>
  (err: Error): void => {
    const exit = (): void => process.exit(1);

    AppLogger.error(err);

    server.close(exit);
    setTimeout(exit, 1000).unref();
  };
