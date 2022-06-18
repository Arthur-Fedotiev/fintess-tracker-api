import { NextFunction, Request, RequestHandler, Response } from 'express';
import { User } from '../../../../entities/auth/User';
import { Roles } from '../../../shared/constants/roles.enum';
import { AuthRepository } from './auth-repository.class';

export abstract class AuthService {
  public abstract authRepository: AuthRepository;

  public abstract init(): void;
  public abstract authProtected(
    allowedRoles?: Roles[],
  ): (
    this: AuthService,
    req: Request<any> & { user?: User },
    res: Response,
    next: NextFunction,
  ) => void;
  public abstract adminOnly(
    req: Request<unknown>,
    res: Response,
    next: NextFunction,
  ): void;
}
