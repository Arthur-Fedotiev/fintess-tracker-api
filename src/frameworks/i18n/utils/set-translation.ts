import { TargetLanguages } from '../../../app/contracts/i18n/models/target-languages.type';
import { TranslationDTO } from '../../../app/contracts/i18n/models/translatin-dto.interface';

export const setTranslation =
  (targetLanguages: TargetLanguages) =>
  (
    translationsMap: TranslationDTO<string>,
    translation: string,
    idx: number,
  ): TranslationDTO<string> => {
    return {
      ...translationsMap,
      [targetLanguages[idx]]: translation,
    };
  };
