import { TargetLanguages } from '../models/target-languages.type';
import { TranslationDTO } from '../models/translatin-dto.interface';

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
