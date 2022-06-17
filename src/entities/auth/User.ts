export interface User {
  readonly email: string;
  readonly password: string;
  readonly firstName: string;
  readonly phoneNumber?: string;
  readonly lastName?: string;
  readonly photoUrl?: string;
}
