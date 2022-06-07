import { ExerciseDocument } from '../../../../entities/exercise/models/exercise-document.type';
import { LanguageCodes } from '../../../i18n/models/target-languages.type';

export function mergeTranslation(
  this: ExerciseDocument,
  language: LanguageCodes,
): void {
  Object.assign(this, this[language], { [language]: undefined });
}
