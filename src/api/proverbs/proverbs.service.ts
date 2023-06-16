import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProverbDto } from './dto/create-proverb.dto';
import { UpdateProverbDto } from './dto/update-proverb.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Proverb } from './entities/proverb.entity';
import { ILike, Repository } from 'typeorm';
import { DEFAULT_PAGE_SIZE } from 'src/constants';
import { FindProverbsDto } from './dto/find-proverb.dto';

@Injectable()
export class ProverbsService {
  constructor(
    @InjectRepository(Proverb) private proverbsRepository: Repository<Proverb>,
  ) {}

  async create(createProverbDto: CreateProverbDto) {
    const oldProverb = await this.proverbsRepository.findOneBy({
      igbo: createProverbDto.igbo,
    });
    if (oldProverb)
      throw new ConflictException(
        `This proverb already exists with id ${oldProverb.id}`,
      );

    const newProverb = this.proverbsRepository.create(createProverbDto);
    return this.proverbsRepository.save(newProverb);
  }

  // TODO use an interceptor to always format the output in particular way
  findAll({ filter, pageNumber, pageSize }: FindProverbsDto) {
    pageNumber = pageNumber || 1;
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
    // instead of doing softRemove, I think it's better to move deleted items to deleted_proverbs table.
    // same schema but with an extra deletedAt column. Reason is that it would be easy to create indexes like 'unique' on the main table
    // without getting a duplicate error simply because a record is colliding with a supposedly deleted record.
    // for now sha, I am replacing softRemove with remove. and removing deletedAt from the proverbs table
    const proverb = await this.findOne(id);
    return this.proverbsRepository.remove(proverb);
  }
}
