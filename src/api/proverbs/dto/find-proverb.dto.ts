import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class FindProverbsDto {
  @IsString()
  @IsOptional()
  filter?: string; // igbo or english word or phrase to search by

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  pageNumber?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  pageSize?: number;
}
