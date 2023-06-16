import {
  IsEmail,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Gender } from '../user.models';

const PASSWORD_LENGTH = 4;

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword(
    {
      minLength: PASSWORD_LENGTH,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Password should be at least ' +
        PASSWORD_LENGTH +
        ' characters and contain minimum of 1 uppercase letter, 1 lowercase letter, 1 symbol and 1 number',
    },
  )
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEnum(Gender, {
    message: 'gender should be either 0 (for female) or 1 (for male)',
  })
  gender: Gender;

  //   TODO custom date validator to ensure only UTC dates are allowed. Replace all other instances of IsIso8601 with that decorator
  @IsISO8601({ strict: true, strictSeparator: true })
  dateOfBirth: Date;
}
