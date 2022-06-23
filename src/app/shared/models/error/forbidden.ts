import { HttpException } from './http-exception';

export class ForbiddenException extends HttpException {
  public readonly statusCode = 403;
  constructor(message = 'No rights to access requested resource') {
    super(message);
  }
}
