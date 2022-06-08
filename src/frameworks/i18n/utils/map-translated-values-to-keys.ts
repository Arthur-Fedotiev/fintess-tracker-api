import { ExerciseTranslatableData } from '../../../entities/exercise/models/exercise-translatable-data.interface';
import { TranslationDTO } from '../../../app/contracts/i18n/models/translatin-dto.interface';
import { TranslatedData } from '../../../app/contracts/i18n/models/translation.interfaces';

export const mapTranslatedValuesToKeys =
  (rawTranslatedData: TranslationDTO<string>[]) =>
  (
    translatedDataMap: TranslatedData<ExerciseTranslatableData>,
    [key]: [string, string],
    idx: number,
  ) => ({
    ...translatedDataMap,
    [key]: rawTranslatedData[idx],
  });
