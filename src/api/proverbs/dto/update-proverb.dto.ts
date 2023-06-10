import { PartialType } from '@nestjs/mapped-types';
import { CreateProverbDto } from './create-proverb.dto';

export class UpdateProverbDto extends PartialType(CreateProverbDto) {}
