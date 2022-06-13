import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { NextFunction, Response } from 'express';

const extractErrorMessages = (errors: ValidationError[]): string[] => {
  const messages = errors.map((error: ValidationError) => {
    const parentMessage = Object.values(error.constraints ?? {});

    const childrenMessage = error.children?.length
      ? extractErrorMessages(error.children)
      : [];
    return [...parentMessage, ...childrenMessage];
  });

  console.log('messages'.red, messages);

  return messages.flat();
};

export default function validationMiddleware<T extends object>(
  type: ClassConstructor<T>,
  skipMissingProperties = false,
): (req: any, _res: Response, next: NextFunction) => Promise<void> {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const { body } = req;
    const errors = await validate(plainToInstance(type, body), {
      skipMissingProperties,
    });

    if (errors.length) {
      const message = extractErrorMessages(errors);

      next(new Error(JSON.stringify(message)));
    }

    next();
  };
}
