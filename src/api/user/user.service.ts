import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Between, ILike, Repository } from 'typeorm';
import { FindUserDto } from './dto/find-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon from 'argon2';
import { prepareQueryParams } from './user.helpers';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findOneBy({
      email: createUserDto.email,
    });
    if (existingUser)
      throw new ConflictException(
        `A user with email ${createUserDto.email} already exists`,
      );

    const passwordHash = await argon.hash(createUserDto.password);
    const newUser = this.usersRepository.create({
      ...createUserDto,
      passwordHash,
    });

    return this.usersRepository.save(newUser);
  }

  findAll(findUserDto: FindUserDto) {
    const { pageSize, pageNumber, name, email, dateFilters } =
      prepareQueryParams(findUserDto);

    return this.usersRepository.find({
      where: [
        {
          email: ILike(`%${email}%`),
          firstName: ILike(`%${name}%`),
          ...dateFilters,
        },
        {
          email: ILike(`%${email}%`),
          lastName: ILike(`%${name}%`),
          ...dateFilters,
        },
      ],
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      order: { updatedAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    let user;
    try {
      user = await this.usersRepository.findOneByOrFail({ id });
    } catch (e) {
      throw new NotFoundException();
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    return this.usersRepository.save({ ...user, ...updateUserDto });
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.usersRepository.remove(user);
  }
}
