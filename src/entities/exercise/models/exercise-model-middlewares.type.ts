import { LanguageCodes } from '../../../app/contracts/i18n/models/target-languages.type';
import { ExerciseDocument } from './exercise-document.type';

export interface ExerciseModelMiddlewares {
  mergeTranslations: (
    this: ExerciseDocument,
    languages: LanguageCodes[],
  ) => void;
}
