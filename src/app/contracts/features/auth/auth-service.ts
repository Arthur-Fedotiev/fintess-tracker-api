import { NextFunction } from 'express';
import { AuthRepository } from './auth-repository.class';

export abstract class AuthService {
  abstract authRepository: AuthRepository;

  abstract init(): void;
  abstract authProtected(
    this: AuthService,
    req: any,
    _res: any,
    next: NextFunction,
  ): void;
}
