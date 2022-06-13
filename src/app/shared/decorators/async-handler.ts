import { NextFunction, Response } from 'express';

export function AsyncHandler() {
  return function (
    _target: object,
    _propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const { value: originalFn } = descriptor;

    descriptor.value = function (
      req: Request,
      res: Response,
      next: NextFunction,
    ) {
      return Promise.resolve(originalFn.call(this, req, res, next)).catch(next);
    };
  };
}
