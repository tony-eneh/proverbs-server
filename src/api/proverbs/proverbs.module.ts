import { Module } from '@nestjs/common';
import { ProverbsService } from './proverbs.service';
import { ProverbsController } from './proverbs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proverb } from './entities/proverb.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proverb])],
  controllers: [ProverbsController],
  providers: [ProverbsService],
})
export class ProverbsModule {}
