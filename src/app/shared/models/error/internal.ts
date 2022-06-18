import { HttpException } from './http-exception';

export class InternalServerException extends HttpException {
  public readonly statusCode = 500;
  constructor(message: string = 'Server Error') {
    super(message);
  }
}
