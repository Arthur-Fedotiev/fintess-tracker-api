import { HttpException } from './http-exception';

export class FirebaseAuthException extends HttpException {
  public readonly statusCode = 503;
  constructor(...messages: string[]) {
    super(['Authorization Failed', ...messages]);
  }
}
