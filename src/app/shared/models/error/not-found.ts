import { HttpException } from './http-exception';

export class NotFoundException extends HttpException {
  public readonly statusCode = 404;
  constructor() {
    super('Resource not found');
  }
}
