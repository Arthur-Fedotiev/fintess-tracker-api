import { v2 } from '@google-cloud/translate';
import { TranslateService } from '../../app/contracts/i18n/translate-service';
import { ExerciseTranslatableData } from '../../entities/exercise';
import { LANGUAGE_CODES } from '../../app/contracts/i18n/constants/target-languages';
import { LanguageCodes } from '../../app/contracts/i18n/models/target-languages.type';
import { TranslationDTO } from '../../app/contracts/i18n/models/translatin-dto.interface';
import {
  TranslatedData,
  Translations,
} from '../../app/contracts/i18n/models/translation.interfaces';
import { mapTranslatedValuesToKeys } from './utils/map-translated-values-to-keys';
import { setTranslation } from './utils/set-translation';
import { mapTranslatedData } from './utils/translation-mappers';
import { AppLogger } from '../common/log/winston-logger';
import { InternalServerException } from '../../app/shared/models/error/internal';

export class GoogleTranslateService extends TranslateService {
  constructor(private readonly translateProvider: v2.Translate) {
    super();
  }

  public async translate<T extends string | object>(
    translatableData: T,
  ): Promise<Translations<string | object>> {
    try {
      const translatableEntries: [string, string][] =
        Object.entries(translatableData);

      const rawTranslatedData: (TranslationDTO<string> | null)[] =
        await Promise.all(
          translatableEntries.map(([, value]) => this.translateToLangs(value)),
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

      return translations;
    } catch (error) {
      AppLogger.error(error);

      throw new InternalServerException('Translation service problem');
    }
  }

  private async translateText(
    text: string,
    targetLanguage: LanguageCodes,
  ): Promise<string> {
    const [result] = await this.translateProvider.translate(
      text,
      targetLanguage,
    );

    return result;
  }

  private async translateToLangs(
    text: string,
    targetLanguages = LANGUAGE_CODES,
  ): Promise<TranslationDTO<string> | null> {
    const translations: Promise<string>[] = targetLanguages.map((language) =>
      this.translateText(text, language),
    );

    const result = await Promise.all(translations);

    const response: TranslationDTO<string> = result.reduce(
      setTranslation(targetLanguages),
      {} as TranslationDTO<string>,
    );

    return response;
  }
}
