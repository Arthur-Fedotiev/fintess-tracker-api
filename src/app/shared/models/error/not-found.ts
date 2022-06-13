import { HttpException } from './http-exception';

export class NotFoundException extends HttpException {
  public statusCode = 404;
  constructor() {
    super('Resource not found');
  }
}
