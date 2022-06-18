import { NextFunction, Request, Response } from 'express';
import { AppLogger } from '../../../../frameworks/common/log/winston-logger';
import {
  QueryWithLanguage,
  SelectLanguageQuery,
} from '../../../shared/models/api/query-with-language.interface';
import { LanguagesISO } from '../constants/lang-iso';
import { LANGUAGE_CODES } from '../constants/target-languages';
import { LanguageCodes } from '../models/target-languages.type';

const toLanguageExcluded = (
  languageQueryString: SelectLanguageQuery,
): ((code: LanguageCodes) => string) => {
  const allowedLanguages = new Set(languageQueryString.split(','));

  return (code: LanguageCodes): string =>
    !allowedLanguages.has(code) ? '-' + code : '';
};

export const i18n = (
  req: Request<
    unknown,
    unknown,
    unknown,
    QueryWithLanguage & { select?: string }
  >,
  _res: Response,
  next: NextFunction,
): void => {
  if (req.query.select) return next();

  const { lang, ...reqQuery } = req.query;
  const languageQueryString = lang ?? LanguagesISO.ENGLISH;

  const excludedLanguagesQuery = LANGUAGE_CODES.map(
    toLanguageExcluded(languageQueryString),
  )
    .filter(Boolean)
    .join(' ');

  Object.assign(req, {
    query: { ...reqQuery, select: excludedLanguagesQuery },
  });

  AppLogger.info(req.query);

  next();
};
