import { HttpException } from './http-exception';

export class InternalServerException extends HttpException {
  public statusCode = 500;
  constructor() {
    super('Server Error');
  }
}
