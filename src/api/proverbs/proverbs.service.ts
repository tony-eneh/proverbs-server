import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProverbDto } from './dto/create-proverb.dto';
import { UpdateProverbDto } from './dto/update-proverb.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Proverb } from './entities/proverb.entity';
import { ILike, Repository } from 'typeorm';
import {
  DEFAULT_PAGE_NO,
  DEFAULT_PAGE_SIZE,
  ProverbsQuery,
} from './proverbs.model';

@Injectable()
export class ProverbsService {
  constructor(
    @InjectRepository(Proverb) private proverbsRepository: Repository<Proverb>,
  ) {}

  create(createProverbDto: CreateProverbDto) {
    const newProverb = this.proverbsRepository.create(createProverbDto);
    return this.proverbsRepository.save(newProverb);
  }

  // TODO use an interceptor to always format the output in particular way
  findAll({ filter, pageNumber, pageSize }: ProverbsQuery) {
    pageNumber = pageNumber || DEFAULT_PAGE_NO;
    pageSize = pageSize || DEFAULT_PAGE_SIZE;
    filter = (filter || '').normalize('NFKD');

    return this.proverbsRepository.find({
      where: [
        { igbo: ILike(`%${filter}%`) },
        { english: ILike(`%${filter}%`) },
        { meaning: ILike(`%${filter}%`) },
      ],
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      order: { updatedAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    let proverb;
    try {
      proverb = await this.proverbsRepository.findOneByOrFail({ id });
    } catch (e) {
      throw new NotFoundException();
    }
    return proverb;
  }

  async update(id: number, updateProverbDto: UpdateProverbDto) {
    const proverb = await this.findOne(id);
    return this.proverbsRepository.save({ ...proverb, ...updateProverbDto });
  }

  async remove(id: number) {
    const proverb = await this.findOne(id);
    return this.proverbsRepository.softRemove(proverb);
  }
}
