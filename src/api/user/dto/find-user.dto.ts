import { Type } from 'class-transformer';
import {
  IsEmail,
  IsISO8601,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class FindUserDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  pageSize?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  pageNumber?: number;

  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsISO8601({ strictSeparator: true })
  @IsOptional()
  dateCreatedStart?: Date;

  @IsISO8601({ strictSeparator: true })
  @IsOptional()
  dateCreatedEnd?: Date;

  @IsISO8601({ strictSeparator: true })
  @IsOptional()
  dateOfBirthStart?: Date;

  @IsISO8601({ strictSeparator: true })
  @IsOptional()
  dateOfBirthEnd?: Date;
}
