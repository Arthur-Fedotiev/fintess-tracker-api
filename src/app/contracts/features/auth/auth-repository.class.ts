import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { UserWithFullName } from '../../../../entities/auth/models/user-with-full-name';

export abstract class AuthRepository {
  public abstract signup(user: UserWithFullName): Promise<UserRecord>;
  public abstract login(
    credentials: Pick<UserWithFullName, 'email' | 'password'>,
  ): Promise<string | null>;
}
