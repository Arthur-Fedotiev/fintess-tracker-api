import { TranslationDTO } from '../../../../i18n/models/translatin-dto.interface';
import {
  TranslatedData,
  Translations,
} from '../../../../i18n/models/translation.interfaces';
import { translateToLangs } from '../../../../i18n/translate';
import { mapTranslatedValuesToKeys } from '../../../../i18n/utils/map-translated-values-to-keys';
import { mapTranslatedData } from '../../../../i18n/utils/translation-mappers';
import { ExercisePreSaveDTO } from '../../models/exercise-pre-save-DTO.type';
import { ExerciseTranslatableData } from '../../models/exercise.interface';

export async function translateBeforeSave(
  this: ExercisePreSaveDTO,
  next: (err?: Error) => void,
): Promise<void> {
  const { translatableData } = this;
  const translatableEntries: [string, string][] =
    Object.entries(translatableData);

  const rawTranslatedData: (TranslationDTO<string> | null)[] =
    await Promise.all(
      translatableEntries.map(([, value]) => translateToLangs(value)),
    );

  const mappedTranslatedData = translatableEntries.reduce(
    mapTranslatedValuesToKeys(
      rawTranslatedData.filter((data): data is TranslationDTO<string> =>
        Boolean(data),
      ),
    ),
    {} as TranslatedData<ExerciseTranslatableData>,
  );

  const translations: Translations<ExerciseTranslatableData> =
    mapTranslatedData<ExerciseTranslatableData>(mappedTranslatedData);

  Object.assign(this, translations, { translatableData: undefined });

  next();
}
