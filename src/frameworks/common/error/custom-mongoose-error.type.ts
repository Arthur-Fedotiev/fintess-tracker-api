import { MongooseError } from 'mongoose';
import { MongooseErrorNamesEnum } from './mongoose-errors-identifiers.enum';

export type CustomMongooseError = MongooseError & {
  errors?: { message: string }[];
  name: keyof typeof MongooseErrorNamesEnum;
  code: number;
};
