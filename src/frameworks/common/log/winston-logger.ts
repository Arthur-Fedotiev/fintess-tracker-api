import { fileTransports, format, transportsConfig } from './config';
import { createLogger, transports } from 'winston';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const c = require('colors');
import colors from 'colors';

const logger: ReturnType<typeof createLogger> = createLogger({
  transports: [
    ...fileTransports,
    new transports.Console(transportsConfig.console),
  ],
  exitOnError: false,
  format,
});

logger.stream = <any>{
  write: (message: string): void => {
    logger.info(message);
  },
};

export const AppLogger = logger;
