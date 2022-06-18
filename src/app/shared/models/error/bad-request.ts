import { HttpException } from './http-exception';

export class BadRequestException extends HttpException {
  public readonly statusCode = 400;
  constructor(message: string | string[]) {
    super(message);
  }
}
