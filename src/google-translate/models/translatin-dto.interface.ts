import { TargetLanguages } from './target-languages.type';

export type TranslationDTO<T extends string | Record<string, string>> = {
  [key in TargetLanguages[number]]: T;
};
