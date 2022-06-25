import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  Matches,
  IsOptional,
  IsUrl,
  IsPhoneNumber,
} from 'class-validator';
import { User } from '../../../entities/auth/User';

const strongPassword = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
);
const errorMessage =
  'Password is too weak. It must contain at least 1 lowercase alphabetical character, at least 1 uppercase alphabetical character, at least 1 numeric character, and be eight characters or longer';

export class CreateUserDTO implements User {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(strongPassword, {
    message: errorMessage,
  })
  password!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(15)
  firstName!: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(15)
  lastName?: string;

  @IsOptional()
  @IsUrl()
  @MaxLength(100)
  photoUrl?: string;

  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;
}
