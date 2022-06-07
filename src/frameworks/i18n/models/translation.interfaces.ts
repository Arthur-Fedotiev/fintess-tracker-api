import { ExerciseTranslatableData } from '../../../entities/exercise/models/exercise-translatable-data.interface';
import { LanguageCodes } from './target-languages.type';

export type TranslatedData<T> = {
  [Property in keyof T]: { [langKey in LanguageCodes]: T[Property] };
};

export type Translations<T> = {
  [langKey in LanguageCodes]: T;
};

export type TranslatedExercise = TranslatedData<ExerciseTranslatableData>;
export type ExerciseTranslations = Translations<ExerciseTranslatableData>;
export type extractedKey = keyof TranslatedExercise;

export type ExtractedTranslation<
  P,
  T extends LanguageCodes,
> = Translations<P>[T];
