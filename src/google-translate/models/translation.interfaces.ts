import { TranslatableData } from '../../features/exercises/models/exercise.interface';
import { LanguageCodes } from './target-languages.type';

export type TranslatedData<T> = {
  [Property in keyof T]: { [langKey in LanguageCodes]: T[Property] };
};

export type Translations<T> = {
  [langKey in LanguageCodes]: T;
};

export type TranslatedExercise = TranslatedData<TranslatableData>;
export type ExerciseTranslations = Translations<TranslatableData>;
export type extractedKey = keyof TranslatedExercise;

export type ExtractedTranslation<
  P,
  T extends LanguageCodes,
> = Translations<P>[T];
