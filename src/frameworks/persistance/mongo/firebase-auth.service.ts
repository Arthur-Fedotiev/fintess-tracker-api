import { AuthRepository } from '../../../app/contracts/features/auth/auth-repository.class';
import { AuthService } from '../../../app/contracts/features/auth/auth-service';
import admin from 'firebase-admin';
import { ENV_CONFIG } from '../../../env-config';
import bind from 'bind-decorator';
import { FirebaseAuthRepository } from '../../authentication/firebase/firebase-auth-repository';
import { NextFunction } from 'express';
import { UnauthorizedException } from '../../../app/shared/models/error/unauthorized';

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
  public authProtected(req: any, _res: any, next: NextFunction): void {
    if (req.headers.authorization) {
      admin
        .auth()
        .verifyIdToken(req.headers.authorization)
        .then(() => {
          next();
        })
        .catch(() => {
          next(new UnauthorizedException(this.unauthorizedMessage));
        });
    } else {
      next(new UnauthorizedException(this.unauthorizedMessage));
    }
  }
}
