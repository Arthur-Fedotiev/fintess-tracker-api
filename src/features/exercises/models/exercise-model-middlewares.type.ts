import { LanguageCodes } from '../../../i18n/models/target-languages.type';
import { ExercisePersistedDoment } from './exercise-persisted-document.type';

export interface ExerciseModelMiddlewares {
  mergeTranslation: (
    this: ExercisePersistedDoment,
    language: LanguageCodes,
  ) => void;
}
