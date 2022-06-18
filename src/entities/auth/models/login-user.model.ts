import { User } from '../User';

export type LoginUser = Pick<User, 'email' | 'password'>;
