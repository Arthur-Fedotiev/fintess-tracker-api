import { LanguageCodes } from '../../../../frameworks/i18n/models/target-languages.type';
import { Exercise } from '../../Exercise';
import { ExerciseTranslatableData } from '../exercise-translatable-data.interface';

export type ExercisePreSaveDTO = Omit<
  Exercise,
  LanguageCodes | keyof ExerciseTranslatableData
> & { translatableData: ExerciseTranslatableData };
