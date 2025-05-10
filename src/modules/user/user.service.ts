import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { FilterUserDto } from './dto/filter-user.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { PageMetaDto } from 'src/common/dto/page-meta.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async findAll(@Query() dto: FilterUserDto): Promise<PageDto<User>> {
    const { page, take, q, name, phone, email } = dto;

    const where: FindOptionsWhere<User> = {};

    if (name) where.name = Like(`%${name}%`);
    if (email) where.email = Like(`%${email}%`);
    if (phone) where.phone = Like(`%${phone}%`);

    const [users, count] = await this.repository.findAndCount({
      where,
      skip: (page - 1) * take,
      take,
    });

    return new PageDto(
      users,
      new PageMetaDto({ itemCount: count, pageOptionsDto: dto }),
    );
  }

  async findOne(id: number): Promise<User> {
    return this.repository.findOne({ where: { id } });
  }

  async create(dto: CreateUserDto): Promise<User> {
    const { phone, email } = dto;

    const checkPhone = await this.repository.findOne({
      where: { phone },
    });

    if (checkPhone) {
      throw new HttpException('Số điện thoại đã tồn tại!', HttpStatus.CONFLICT);
    }

    const checkEmail = await this.repository.findOne({
      where: { email },
    });

    if (checkEmail) {
      throw new NotFoundException('Email không tồn tại!');
    }

    const SALT = bcrypt.genSaltSync();

    const passwordHash = await bcrypt.hash(dto.password, SALT);

    dto.password = passwordHash;

    return this.repository.save(dto);
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    await this.repository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
