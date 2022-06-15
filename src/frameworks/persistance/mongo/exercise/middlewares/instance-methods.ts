import { ExerciseDocument } from '../../../../../entities/exercise';
import { LanguageCodes } from '../../../../../app/contracts/i18n/models/target-languages.type';

export function mergeTranslations(
  this: ExerciseDocument,
  languages: LanguageCodes[],
): void {
  languages.forEach((language) =>
    Object.assign(this, this[language], { [language]: undefined }),
  );
}
