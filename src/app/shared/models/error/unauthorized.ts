import { HttpException } from './http-exception';

export class UnauthorizedException extends HttpException {
  public statusCode = 401;
  constructor(message: string = 'Unauthorized to access the resource.') {
    super(message);
  }
}
