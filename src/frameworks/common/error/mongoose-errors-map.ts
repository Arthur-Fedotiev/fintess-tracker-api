import { BadRequestException } from '../../../app/shared/models/error/bad-request';
import { HttpException } from '../../../app/shared/models/error/http-exception';
import { NotFoundException } from '../../../app/shared/models/error/not-found';
import { CustomMongooseError } from './custom-mongoose-error.type';
import {
  MongooseErrorCodesEnum,
  MongooseErrorNamesEnum,
} from './mongoose-errors-identifiers.enum';

export const MONGOOSE_ERRORS_MAP = new Map<
  MongooseErrorNamesEnum | string,
  (err: CustomMongooseError) => HttpException
>()
  .set(MongooseErrorNamesEnum.CastError, () => new NotFoundException())
  .set(
    MongooseErrorNamesEnum.ValidationError,
    (err: CustomMongooseError) =>
      new BadRequestException(
        Object.values(err.errors ?? []).map((err) => err.message),
      ),
  )
  .set(
    MongooseErrorCodesEnum[11000],
    () => new BadRequestException('Duplicate field value entered'),
  )
  .set(
    MongooseErrorCodesEnum[31254],
    (err: CustomMongooseError) => new BadRequestException(err.message),
  );
