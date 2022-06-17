import { AuthService } from '../../../app/contracts/features/auth/auth-service';
import admin from 'firebase-admin';
import { ENV_CONFIG } from '../../../env-config';
import bind from 'bind-decorator';
import { FirebaseAuthRepository } from './firebase-auth-repository';
import { NextFunction } from 'express';
import { UnauthorizedException } from '../../../app/shared/models/error/unauthorized';
import { AsyncHandler } from '../../../app/shared/decorators/async-handler';
import { AppLogger } from '../../common/log/winston-logger';

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
  @AsyncHandler()
  public async authProtected(
    req: any,
    _res: any,
    next: NextFunction,
  ): Promise<void> {
    const token = this.getAuthToken(req.headers.authorization);

    if (!token) next(new UnauthorizedException(this.unauthorizedMessage));

    req.user = await this.firebaseAdminApp.auth().verifyIdToken(token!);

    next();
  }

  private getAuthToken(authorization?: string): string | null {
    const [bearer, token] = (authorization ?? '').split(' ');

    return bearer === 'Bearer' && token ? token : null;
  }
}
