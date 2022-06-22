import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { UserWithFullName } from '../../../../entities/auth/models/user-with-full-name';
import { UserCredentials } from './user-credentials';

export abstract class AuthRepository {
  public abstract signup(user: UserWithFullName): Promise<UserRecord>;
  public abstract login(credentials: UserCredentials): Promise<string | null>;
}
