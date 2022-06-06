import { LanguageCodes } from '../../../../i18n/models/target-languages.type';
import { ExercisePersistedDoment } from '../../models/exercise-persisted-document.type';

export function mergeTranslation(
  this: ExercisePersistedDoment,
  language: LanguageCodes,
): void {
  Object.assign(this, this[language], { [language]: undefined });
}
