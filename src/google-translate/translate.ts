import { v2 } from '@google-cloud/translate';
import { ENV_CONFIG } from '../env-config';
import { TARGET_LANGUAGES } from './constants/target-languages';
import { GoogleTranslateResponse } from './models/google-translate-response.interface';
import { TargetLanguages } from './models/target-languages.type';
import { TranslationDTO } from './models/translatin-dto.interface';
import { setTranslation } from './utils/set-translation';

const translate = new v2.Translate({
  credentials: ENV_CONFIG.googleTranslateCreds,
  projectId: ENV_CONFIG.googleTranslateCreds.project_id,
});

export const detectLanguage = async (text: string) => {
  try {
    const response = await translate.detect(text);
    return response[0].language;
  } catch (error) {
    console.log(`Error at detectLanguage --> ${error}`);
    return 0;
  }
};

export const translateText = async <T extends string | Record<string, string>>(
  text: T,
  targetLanguages = TARGET_LANGUAGES,
) => {
  try {
    const translations: Promise<GoogleTranslateResponse<T>>[] = targetLanguages.map((language) =>
      translate.translate(text as string, language),
    );
    const result: GoogleTranslateResponse<T>[] = await Promise.all(translations);

    const response: TranslationDTO<T> = result.reduce(setTranslation(targetLanguages), {} as TranslationDTO<T>);

    return response;
  } catch (error) {
    console.log(`Error at translateText --> ${error}`);
    return 0;
  }
};
