import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { Brackets } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment'; // đảm bảo đã cài moment
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
    const { take, skip: skipRaw, q, status, from_date, to_date } = dto;
    const skip = parseInt(skipRaw as any, 10) || 0;

    const query = this.repository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.name',
        'user.email',
        'user.phone',
        'user.role',
        'user.status',
        'user.created_at',
      ]);

    // Tìm kiếm theo từ khóa (q)
    if (q) {
      const keyword = `%${q}%`;
      query.andWhere(
        new Brackets((qb) => {
          qb.where('user.phone LIKE :keyword', { keyword })
            .orWhere('user.name LIKE :keyword', { keyword })
            .orWhere('user.email LIKE :keyword', { keyword });
        }),
      );
    }

    // Lọc theo status
    if (status) {
      query.andWhere('user.status = :status', { status });
    }

    // Lọc theo from_date và to_date
    if (from_date) {
      const fromDateStart = moment(from_date).startOf('day').toDate();
      query.andWhere('user.created_at >= :fromDate', {
        fromDate: fromDateStart,
      });
    }

    if (to_date) {
      const toDateEnd = moment(to_date).endOf('day').toDate();
      query.andWhere('user.created_at <= :toDate', { toDate: toDateEnd });
    }

    query.skip(skip).take(take);

    const [users, count] = await query.getManyAndCount();

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
