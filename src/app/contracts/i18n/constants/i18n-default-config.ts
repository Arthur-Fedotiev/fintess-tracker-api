import { LanguageCodes } from '../models/target-languages.type';
import { LANGUAGE_CODES } from './target-languages';

export const i18nDefaultConfig = {
  excludedLanguagesQuery: '',
  languages: LANGUAGE_CODES as unknown as LanguageCodes[],
};
