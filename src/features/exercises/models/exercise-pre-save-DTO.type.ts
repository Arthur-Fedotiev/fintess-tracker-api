import { LanguageCodes } from '../../../i18n/models/target-languages.type';
import { ExerciseSchemaType } from './exercise-schema.model';
import { ExerciseTranslatableData } from './exercise.interface';

export type ExercisePreSaveDTO = Omit<
  ExerciseSchemaType,
  LanguageCodes | keyof ExerciseTranslatableData
> & { translatableData: ExerciseTranslatableData };
