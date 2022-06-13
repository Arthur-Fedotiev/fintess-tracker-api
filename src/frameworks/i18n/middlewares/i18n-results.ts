import { NextFunction, Request, Response } from 'express';
import { LanguagesISO } from '../../../app/contracts/i18n/constants/lang-iso';
import { LANGUAGE_CODES } from '../../../app/contracts/i18n/constants/target-languages';
import { LanguageCodes } from '../../../app/contracts/i18n/models/target-languages.type';
import { QueryWithLanguage } from '../../../app/shared/models/api/query-with-language.interface';

const toLanguageExcluded =
  (language: LanguageCodes): ((code: LanguageCodes) => string) =>
  (code: LanguageCodes): string =>
    code !== language ? '-' + code : '';

export const i18nResults = async (
  req: Request<unknown, unknown, object, QueryWithLanguage>,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const { lang, ...reqQuery } = req.query ?? {};
    const language =
      lang && Object.keys(LanguagesISO).includes(lang)
        ? lang
        : LanguagesISO.ENGLISH;

    const excludedLanguagesQuery = LANGUAGE_CODES.map(
      toLanguageExcluded(language),
    ).join(' ');

    const i18nResults = {
      excludedLanguagesQuery,
      language,
    };

    Object.assign(req, {
      query: reqQuery,
      body: {
        i18nResults,
        ...(req.body ?? {}),
      },
    });
    next();
  } catch (error) {
    next(error);
  }
};
