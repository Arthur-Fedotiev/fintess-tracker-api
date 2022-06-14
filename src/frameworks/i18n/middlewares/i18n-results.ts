import { NextFunction, Request, Response } from 'express';
import { LanguagesISO } from '../../../app/contracts/i18n/constants/lang-iso';
import {
  LANGUAGE_CODES,
  LANGUAGE_CODES_SET,
} from '../../../app/contracts/i18n/constants/target-languages';
import { LanguageCodes } from '../../../app/contracts/i18n/models/target-languages.type';
import { QueryWithLanguage } from '../../../app/shared/models/api/query-with-language.interface';

const toLanguageExcluded =
  (allowedLanguages: Set<LanguageCodes>): ((lang: LanguageCodes) => string) =>
  (lang: LanguageCodes): string =>
    allowedLanguages.has(lang) ? '' : `-${lang}`;

const getFilteredLanguages = (languagesQuery?: string): Set<LanguageCodes> => {
  const fallbackLAnguageSet = new Set([LanguagesISO.DEFAULT as LanguageCodes]);

  if (!languagesQuery) return fallbackLAnguageSet;

  const languages = languagesQuery
    .split(',')
    .filter((lang: string): lang is LanguageCodes =>
      LANGUAGE_CODES_SET.has(lang as LanguageCodes),
    );

  if (!languages.length) return fallbackLAnguageSet;

  return new Set(languages);
};

export const i18nResults = async (
  req: Request<unknown, unknown, object, QueryWithLanguage>,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const { lang, ...reqQuery } = req.query ?? {};
    const languagesSet = getFilteredLanguages(lang); // Set{'en', 'bg'}
    const languages = [...languagesSet]; //    ['en', 'bg']

    const excludedLanguagesQuery = LANGUAGE_CODES.map(
      toLanguageExcluded(languagesSet),
    ).join(' ');

    const i18nResults = {
      excludedLanguagesQuery,
      languages,
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
