import appRoot from 'app-root-path';
import winston from 'winston';
import { NodeEnvEnum } from '../../../app/shared/constants/node-env.enum';
const {
  format: { colorize, combine, printf, timestamp, json, errors },
  createLogger,
  transports,
} = winston;

const env = process.env.NODE_ENV || NodeEnvEnum.Dev;
const isDevelopment = env === NodeEnvEnum.Dev;

export const transportsConfig = {
  combinedFile: {
    level: 'info',
    filename: `${appRoot}/logs/app-combined.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  errorFile: {
    level: 'error',
    filename: `${appRoot}/logs/app-error.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'info',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

export const format = isDevelopment
  ? combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
      colorize({ all: true }),
      printf(
        (info) =>
          `${info.timestamp} ${info.level}: ${info.message}
           ${info.stack ?? ''}`,
      ),
    )
  : combine(
      errors({ stack: true }),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
      json(),
    );

export const fileTransports = !isDevelopment
  ? [
      new transports.File(transportsConfig.combinedFile),
      new transports.File(transportsConfig.errorFile),
    ]
  : [];
