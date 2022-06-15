import { LanguageCodes } from '../../../contracts/i18n/models/target-languages.type';

type SelectLanguageQuery =
  | `${LanguageCodes}`
  | `${LanguageCodes},${LanguageCodes}`
  | `${LanguageCodes},${LanguageCodes},${LanguageCodes}`
  | `${LanguageCodes},${LanguageCodes},${LanguageCodes},${LanguageCodes}`;

export type QueryWithLanguage = {
  lang?: SelectLanguageQuery;
} & Record<string, string>;
