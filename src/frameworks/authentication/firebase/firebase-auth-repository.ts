import { AuthRepository } from '../../../app/contracts/features/auth/auth-repository.class';
import { UserWithFullName } from '../../../entities/auth/models/user-with-full-name';
import admin from 'firebase-admin';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import axios, { AxiosError } from 'axios';
import { AppLogger } from '../../common/log/winston-logger';
import { FirebaseAuthException } from '../../../app/shared/models/error/authentication';
import { ENV_CONFIG } from '../../../env-config';

export class FirebaseAuthRepository extends AuthRepository {
  private firebaseAdminApp!: admin.app.App;
  private readonly loginURL =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';

  constructor() {
    super();
  }

  public async login({
    email,
    password,
  }: Pick<UserWithFullName, 'email' | 'password'>): Promise<string | null> {
    try {
      const res = await axios.post<{ idToken: string }>(
        `${this.loginURL}${ENV_CONFIG.webApiToken}`,
        { email, password, returnSecureToken: true },
      );

      return res.data?.idToken ?? null;
    } catch (err: unknown) {
      AppLogger.debug((err as AxiosError<Error>).response);

      const code = (err as AxiosError<{ error: Error }>).response?.data?.error
        ?.message;

      throw code ? { code } : new FirebaseAuthException();
    }
  }

  public async signup(user: UserWithFullName): Promise<UserRecord> {
    return await this.firebaseAdminApp.auth().createUser(user);
  }

  public setFirebaseAdminApp(app: admin.app.App): void {
    this.firebaseAdminApp = app;
  }
}
