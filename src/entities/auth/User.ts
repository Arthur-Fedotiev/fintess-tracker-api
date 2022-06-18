import { Roles } from '../../app/shared/constants/roles.enum';

export interface User {
  readonly email: string;
  readonly password: string;
  readonly firstName: string;
  readonly phoneNumber?: string;
  readonly lastName?: string;
  readonly photoUrl?: string;
  readonly role?: Roles;
}
