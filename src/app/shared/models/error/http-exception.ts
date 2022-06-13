export class HttpException extends Error {
  public messages: string[] = [];
  constructor(message: string | string[], public statusCode = 500) {
    const serializedMessages = JSON.stringify(message);

    super(serializedMessages);
    this.messages = Array.isArray(message) ? message : [message];

    Error.captureStackTrace(this, this.constructor);
  }
}
