import { NextFunction } from 'express';
import { Roles } from '../../../shared/constants/roles.enum';
import { AuthRepository } from './auth-repository.class';

export abstract class AuthService {
  abstract authRepository: AuthRepository;

  abstract init(): void;
  abstract authProtected(
    allowedRoles?: Roles[],
  ): (this: AuthService, req: any, _res: any, next: NextFunction) => void;
}
