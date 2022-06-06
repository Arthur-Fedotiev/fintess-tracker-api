export type GoogleTranslateResponse<T extends string | object> = [
  string,
  GoogleTranslateData<T>,
];

export interface GoogleTranslateData<T> {
  translations: Translation<T>[];
}

export interface Translation<T> {
  translatedText: T;
  detectedSourceLanguage: string;
}
