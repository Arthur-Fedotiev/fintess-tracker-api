import { NextFunction, Request, Response } from 'express';
import { LanguagesISO } from '../constants/lang-iso';
import { LANGUAGE_CODES } from '../constants/target-languages';
import { LanguageCodes } from '../models/target-languages.type';

const toLanguageExcluded =
  (language: LanguageCodes): ((code: LanguageCodes) => string) =>
  (code: LanguageCodes): string =>
    code !== language ? '-' + code : '';

export const i18nResults = async (
  req: Request<
    Record<string, unknown>,
    unknown,
    unknown,
    { lang: LanguageCodes }
  >,
  _res: Response,
  next: NextFunction,
) => {
  const { lang, ...reqQuery } = req.query;
  const language = lang ?? LanguagesISO.ENGLISH;

  const excludedLanguagesQuery = LANGUAGE_CODES.map(
    toLanguageExcluded(language),
  ).join(' ');

  const i18nResults = {
    excludedLanguagesQuery,
    language,
  };

  Object.assign(req, {
    query: reqQuery,
    i18nResults,
  });

  next();
};
