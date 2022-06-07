import { ExercisePreSaveDTO } from '../../../../entities/exercise/models/dto/exercise-pre-save-DTO.type';
import { ExerciseTranslatableData } from '../../../../entities/exercise/models/exercise-translatable-data.interface';
import { TranslationDTO } from '../../../i18n/models/translatin-dto.interface';
import {
  TranslatedData,
  Translations,
} from '../../../i18n/models/translation.interfaces';
import { translateToLangs } from '../../../i18n/translate';
import { mapTranslatedValuesToKeys } from '../../../i18n/utils/map-translated-values-to-keys';
import { mapTranslatedData } from '../../../i18n/utils/translation-mappers';

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

  Object.assign(this, translations, {
    translatableData: undefined,
  });

  console.log('TRANSLATED_MODEL_INSTANCE'.green, this);

  next();
}
