import { ResponseBody } from './api-response.interface';

export class SuccessfulResponse<T> implements ResponseBody<T> {
  public readonly success = true;

  constructor(public readonly data: T) {}
}
