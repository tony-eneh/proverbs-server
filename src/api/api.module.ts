import { Module } from '@nestjs/common';
import { ProverbsModule } from './proverbs/proverbs.module';

@Module({
  imports: [ProverbsModule],
})
export class ApiModule {}
