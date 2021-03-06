import { HttpException } from './http-exception';

export class UnauthorizedException extends HttpException {
  public readonly statusCode = 401;
  constructor(
    message = 'Not authenticated to access requested resource.',
  ) {
    super(message);
  }
}
