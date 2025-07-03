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
import { UserRole } from './types/user.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

async findAll(@Query() dto: FilterUserDto): Promise<PageDto<User>> {
  const { take, page, q, status, from_date, to_date, role } = dto;

  const pageNumber = parseInt(page as any, 10) || 1;
  const itemsPerPage = parseInt(take as any, 10) || 10;
  const skip = (pageNumber - 1) * itemsPerPage;

  const query = this.repository
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.room_students', 'room_student', 'room_student.deleted_at IS NULL')
    .leftJoinAndSelect('room_student.room', 'room', 'room.deleted_at IS NULL')
    .leftJoinAndSelect('room.room_type', 'room_type', 'room_type.deleted_at IS NULL')
    .leftJoinAndSelect('room.building', 'building', 'building.deleted_at IS NULL')
    .select([
      'user.id',
      'user.name',
      'user.email',
      'user.phone',
      'user.role',
      'user.status',
      'user.cccd_code',
      'user.class_code',
      'user.student_code',
      'user.created_at',
      'user.hometown',

      'room_student.id',
      'room.id',
      'room.room_number',
      'room.floor',
      'room.building_id',
      'room.status',

      'room_type.id',
      'room_type.name',
      'room_type.price',
      'room_type.gender',

      'building.id',
      'building.name',
      'building.address',
    ]);

  // Tìm kiếm theo từ khóa (name, email, phone)
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

  if (status) {
    query.andWhere('user.status = :status', { status });
  }

  if (from_date) {
    const fromDateStart = moment(from_date).startOf('day').toDate();
    query.andWhere('user.created_at >= :fromDate', { fromDate: fromDateStart });
  }

  if (to_date) {
    const toDateEnd = moment(to_date).endOf('day').toDate();
    query.andWhere('user.created_at <= :toDate', { toDate: toDateEnd });
  }

  if (role) {
    query.andWhere('user.role = :role', { role });
  }

  query.skip(skip).take(itemsPerPage);

  const [users, count] = await query.getManyAndCount();

  // Xử lý lấy phòng + thông tin toà nhà
  const usersWithLatestRoom = users.map((user) => {
    const latestRoomStudent = user.room_students?.[0];
    return {
      ...user,
      latest_room: latestRoomStudent?.room
        ? {
            ...latestRoomStudent.room,
            room_type: latestRoomStudent.room.room_type,
            building: latestRoomStudent.room.building,
          }
        : null,
    };
  });

  return new PageDto(
    usersWithLatestRoom as any,
    new PageMetaDto({ itemCount: count, pageOptionsDto: dto }),
  );
}

  async findOne(id: number): Promise<User> {
    return this.repository.findOne({ where: { id } });
  }

  async create(dto: CreateUserDto): Promise<User> {
    const { phone, email, hometown } = dto;

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
      throw new NotFoundException('Email đã tồn tại!');
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

  async countStudent(): Promise<number> {
    const data = await this.repository.count({
      where: { role: UserRole.STUDENT },
    });
    return data;
  }
}
