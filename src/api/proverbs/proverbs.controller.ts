import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProverbsService } from './proverbs.service';
import { CreateProverbDto } from './dto/create-proverb.dto';
import { UpdateProverbDto } from './dto/update-proverb.dto';
import { FindProverbsDto } from './dto/find-proverb.dto';

@Controller('proverbs')
export class ProverbsController {
  constructor(private readonly proverbsService: ProverbsService) {}

  @Post()
  create(@Body() createProverbDto: CreateProverbDto) {
    return this.proverbsService.create(createProverbDto);
  }

  @Get()
  findAll(@Query() query: FindProverbsDto) {
    return this.proverbsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proverbsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProverbDto: UpdateProverbDto) {
    return this.proverbsService.update(+id, updateProverbDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proverbsService.remove(+id);
  }
}
