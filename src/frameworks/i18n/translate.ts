import { v2 } from '@google-cloud/translate';
import { ENV_CONFIG } from '../../env-config';
import { LANGUAGE_CODES } from './constants/target-languages';
import { LanguageCodes } from './models/target-languages.type';
import { TranslationDTO } from './models/translatin-dto.interface';
import { setTranslation } from './utils/set-translation';

const translateService = new v2.Translate({
  credentials: ENV_CONFIG.googleTranslateCreds,
  projectId: ENV_CONFIG.googleTranslateCreds.project_id,
});

export const detectLanguage = async (text: string) => {
  try {
    const response = await translateService.detect(text);
    return response[0].language;
  } catch (error) {
    console.log(`Error at detectLanguage --> ${error}`.red);

    return 0;
  }
};

export const translateText = async (
  text: string,
  targetLanguage: LanguageCodes,
): Promise<string> => {
  try {
    const [result] = await translateService.translate(text, targetLanguage);
    console.log(result);

    return result;
  } catch (error) {
    console.log(`Error at translateText --> ${error}`.red);
    return '';
  }
};

export const translateToLangs = async (
  text: string,
  targetLanguages = LANGUAGE_CODES,
): Promise<TranslationDTO<string> | null> => {
  try {
    console.log(text);

    const translations: Promise<string>[] = targetLanguages.map((language) =>
      translateText(text, language),
    );

    const result = await Promise.all(translations);

    const response: TranslationDTO<string> = result.reduce(
      setTranslation(targetLanguages),
      {} as TranslationDTO<string>,
    );

    return response;
  } catch (error) {
    console.log(`Error at translateToLangs --> ${error}`.red);

    return null;
  }
};
