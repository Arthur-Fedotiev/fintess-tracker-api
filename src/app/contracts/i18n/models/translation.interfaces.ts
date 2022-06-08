import { LanguageCodes } from './target-languages.type';

export type TranslatedData<T> = {
  [Property in keyof T]: { [langKey in LanguageCodes]: T[Property] };
};

export type Translations<T> = {
  [langKey in LanguageCodes]: T;
};
