import { LanguageCodes } from '../../../app/contracts/i18n/models/target-languages.type';
import { ExerciseDocument } from './exercise-document.type';

export interface ExerciseModelMiddlewares {
  mergeTranslation: (this: ExerciseDocument, language: LanguageCodes) => void;
}
