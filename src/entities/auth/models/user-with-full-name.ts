import { User } from '../User';

export type UserWithFullName = Omit<User, 'firstName' | 'lastName'> & {
  displayName: `${User['firstName']} ${User['lastName']}`;
};
