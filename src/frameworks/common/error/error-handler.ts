import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../../../app/shared/models/error/http-exception';
import { InternalServerException } from '../../../app/shared/models/error/internal';
import { AppLogger } from '../log/winston-logger';
import { CustomMongooseError } from './custom-mongoose-error.type';
import {
  MongooseErrorCodesEnum,
  MongooseErrorNamesEnum,
} from './mongoose-errors-identifiers.enum';
import { MONGOOSE_ERRORS_MAP } from './mongoose-errors-map';

export const errorHandler = (
  err: CustomMongooseError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  AppLogger.info(err.code);
  AppLogger.error(err);

  const mongooseErrorIdentifier =
    MongooseErrorNamesEnum[err.name] ?? MongooseErrorCodesEnum[err.code];

  const error =
    err instanceof HttpException
      ? err
      : MONGOOSE_ERRORS_MAP.get(mongooseErrorIdentifier)?.(err) ??
        new InternalServerException();

  res.status(error.statusCode).json({
    success: false,
    errors: error.messages,
  });
};
