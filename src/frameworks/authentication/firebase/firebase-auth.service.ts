import { AuthService } from '../../../app/contracts/features/auth/auth-service';
import admin from 'firebase-admin';
import { ENV_CONFIG } from '../../../env-config';
import bind from 'bind-decorator';
import { FirebaseAuthRepository } from './firebase-auth-repository';
import { NextFunction, RequestHandler } from 'express';
import { UnauthorizedException } from '../../../app/shared/models/error/unauthorized';
import { Roles } from '../../../app/shared/constants/roles.enum';
import { User } from '../../../entities/auth/User';
import { ForbiddenException } from '../../../app/shared/models/error/forbidden';

export class FirebaseAuthService extends AuthService {
  private readonly unauthorizedMessage =
    'Unauthorized to access the resource. Please login at https://fitness-tracker-de06b.web.app/';

  public firebaseAdminApp!: admin.app.App;

  constructor(public readonly authRepository: FirebaseAuthRepository) {
    super();
  }

  @bind
  init(): void {
    this.firebaseAdminApp = admin.initializeApp({
      credential: admin.credential.cert(ENV_CONFIG.firebaseAdminCreds),
    });

    this.authRepository.setFirebaseAdminApp(this.firebaseAdminApp);
  }

  @bind
  public authProtected(allowedRoles?: Roles[]): RequestHandler {
    const self = this;
    return async (req: any, _res: any, next: NextFunction): Promise<void> => {
      try {
        const token = self.getAuthToken(req.headers.authorization);

        if (!token) {
          next(new UnauthorizedException(self.unauthorizedMessage));
        }

        const user = await self.firebaseAdminApp.auth().verifyIdToken(token!);
        req.user = user;

        if (!self.isAllowedRole(user as unknown as User, allowedRoles)) {
          next(new ForbiddenException());
        }

        next();
      } catch (err) {
        next(err);
      }
    };
  }

  private getAuthToken(authorization?: string): string | null {
    const [bearer, token] = (authorization ?? '').split(' ');

    return bearer === 'Bearer' && token ? token : null;
  }

  private isAllowedRole(user: User, allowedRoles?: Roles[]): boolean {
    if (!allowedRoles?.length) return true;

    return !!(user.role && allowedRoles?.includes(user.role));
  }
}
