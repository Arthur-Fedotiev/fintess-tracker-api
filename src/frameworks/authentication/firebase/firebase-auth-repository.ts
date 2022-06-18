import { AuthRepository } from '../../../app/contracts/features/auth/auth-repository.class';
import { UserWithFullName } from '../../../entities/auth/models/user-with-full-name';
import admin from 'firebase-admin';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';

export class FirebaseAuthRepository extends AuthRepository {
  private firebaseAdminApp!: admin.app.App;

  constructor() {
    super();
  }

  public async signup(user: UserWithFullName): Promise<UserRecord> {
    return await this.firebaseAdminApp.auth().createUser(user);
  }

  public setFirebaseAdminApp(app: admin.app.App): void {
    this.firebaseAdminApp = app;
  }
}
