import { TargetLanguages } from './target-languages.type';

export type TranslationDTO<T extends string | object> = {
  [key in TargetLanguages[number]]: T;
};
