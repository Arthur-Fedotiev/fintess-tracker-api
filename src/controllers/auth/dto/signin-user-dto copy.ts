import { IsString, IsEmail } from 'class-validator';
import { UserCredentials } from '../../../app/contracts/features/auth/user-credentials';

export class SigninUserDTO implements UserCredentials {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}
