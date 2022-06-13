import { HttpException } from './http-exception';

export class BadRequestException extends HttpException {
  public statusCode = 400;
  constructor(message: string | string[]) {
    super(message);
  }
}
