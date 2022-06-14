import { LanguageCodes } from '../../../contracts/i18n/models/target-languages.type';

type SelectLanguageQuery =
  | `${LanguageCodes}`
  | `${LanguageCodes},${LanguageCodes}`
  | `${LanguageCodes},${LanguageCodes},${LanguageCodes}`
  | `${LanguageCodes},${LanguageCodes},${LanguageCodes},${LanguageCodes}`;

export interface QueryWithLanguage {
  lang?: SelectLanguageQuery;
}
