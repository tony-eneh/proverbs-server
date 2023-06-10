import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProverbDto {
  @IsString()
  @IsNotEmpty()
  igbo: string;

  @IsString()
  @IsOptional()
  english: string;

  @IsString()
  @IsOptional()
  meaning: string;
}
