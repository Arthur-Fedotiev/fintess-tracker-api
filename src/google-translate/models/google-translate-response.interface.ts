export type GoogleTranslateResponse<T extends string | Record<string, string>> = [string, GoogleTranslateData<T>];

export interface GoogleTranslateData<T> {
  translations: Translation<T>[];
}

export interface Translation<T> {
  translatedText: T;
  detectedSourceLanguage: string;
}
