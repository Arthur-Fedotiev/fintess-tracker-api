import { Server } from 'http';
import { setTimeout } from 'timers';
import { AppLogger } from '../frameworks/common/log/winston-logger';

export type TerminateHandler = (
  code: number,
  reason: string,
) => (err: unknown, promise?: Promise<unknown>) => void;

export const terminate = (
  server: Server,
  options = {
    coredump: false,
    timeout: 500,
  },
): TerminateHandler => {
  const exit = (code: number) => () => {
    options.coredump ? process.abort() : process.exit(code);
  };

  return (code: number, reason: string) => (err: unknown, promise?: unknown) => {
    AppLogger.warn(`Precess exiting with code: ${code}, reason: ${reason}`);
    if (err && err instanceof Error) AppLogger.error(err);
    if (promise) AppLogger.error(promise);

    server.close(exit(code));
    setTimeout(exit(1), 1000).unref();
  };
};
