import { LANGUAGE_CODES } from '../constants/target-languages';

export type TargetLanguages = typeof LANGUAGE_CODES;
export type LanguageCodes = TargetLanguages[number];
