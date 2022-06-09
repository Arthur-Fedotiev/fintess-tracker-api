import { LanguageCodes } from './target-languages.type';

export type TranslationDTO<T extends string | object> = {
  [key in LanguageCodes]: T;
};
