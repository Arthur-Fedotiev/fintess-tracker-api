import { Translations } from './models/translation.interfaces';

export abstract class TranslateService<T = string | object> {
  abstract translate(data: {
    translatableData: T;
  }): Promise<Translations<string | object>>;
}
