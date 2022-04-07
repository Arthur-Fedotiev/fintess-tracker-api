import { LANGUAGE_CODES } from '../constants/target-languages';
import { LanguageCodes } from '../models/target-languages.type';
import { TranslatedData, Translations } from '../models/translation.interfaces';

const extractDataForLangCode =
  <T>(langCode: LanguageCodes, data: TranslatedData<T>) =>
  (acc: T, translatedKey: keyof T): T => {
    acc[translatedKey] = data[translatedKey][langCode];

    return acc;
  };

export const mapTranslatedData = <T extends object>(
  data: TranslatedData<T>,
): Translations<T> => {
  const translatedKeys = Object.keys(data) as (keyof T)[];

  return LANGUAGE_CODES.reduce(
    (acc: Translations<T>, langCode: LanguageCodes) => {
      acc[langCode] = translatedKeys.reduce(
        extractDataForLangCode<T>(langCode, data),
        {} as T,
      );

      return acc;
    },
    {} as Translations<T>,
  );
};
