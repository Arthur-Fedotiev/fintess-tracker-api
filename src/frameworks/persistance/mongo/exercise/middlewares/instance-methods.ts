import { ExerciseDocument } from '../../../../../entities/exercise';
import { LanguageCodes } from '../../../../i18n/models/target-languages.type';

export function mergeTranslation(
  this: ExerciseDocument,
  language: LanguageCodes,
): void {
  Object.assign(this, this[language], { [language]: undefined });
}
