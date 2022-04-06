import { TargetLanguages } from '../models/target-languages.type';

export const setTranslation =
  (targetLanguages: TargetLanguages) =>
  <T extends Record<TargetLanguages[number], string | Record<string, string>>>(
    translationsMap: T,
    [translation]: unknown[],
    idx: number,
  ): T => ({
    ...translationsMap,
    [targetLanguages[idx]]: translation,
  });
