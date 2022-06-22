import { UserWithFullName } from '../../../../entities/auth/models/user-with-full-name';

export type UserCredentials = Pick<UserWithFullName, 'email' | 'password'>;
