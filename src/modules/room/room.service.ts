import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PageDto } from 'src/common/dto/page.dto';
import { Room } from '../../entities/room.entity';
import { FilterRoomDto } from './dto/filter-room.dto';
import { PageMetaDto } from 'src/common/dto/page-meta.dto';
import { Brackets } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import * as moment from 'moment';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomDevice } from 'src/entities/room_device.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private repository: Repository<Room>,
    @InjectRepository(RoomDevice)
    private roomDeviceRepository: Repository<RoomDevice>,
    private readonly dataSource: DataSource,
  ) {}

  async findAll(query: FilterRoomDto): Promise<PageDto<Room>> {
    const {
      take,
      skip: skipRaw,
      q,
      status,
      building_id,
      page,
      from_date,
      to_date,
    } = query;

    // Calculate skip based on page number
    const pageNumber = parseInt(page as any, 10) || 1;
    const itemsPerPage = parseInt(take as any, 10) || 10;
    const skip = (pageNumber - 1) * itemsPerPage;

    const queryBuilder = this.repository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.building', 'building')
      .leftJoinAndSelect('room.room_type', 'room_type')
      .leftJoinAndSelect('room.room_devices', 'room_devices')
      .leftJoinAndSelect('room_devices.device', 'device')
      .select([
        'room.id',
        'room.room_number',
        'room.current_capacity',
        'room.status',
        'room.floor',
        'room.created_at',

        'building.id',
        'building.name',

        'room_type.id',
        'room_type.name',
        'room_type.max_student',
        'room_type.price',

        'room_devices.id',
        'room_devices.quantity',
        'room_devices.description',
        'room_devices.status',

        'device.id',
        'device.device_code',
        'device.name',
      ]);

    // Search by keyword
    if (q) {
      const keyword = `%${q}%`;
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where('room.room_number LIKE :keyword', { keyword }).orWhere(
            'room.room_number LIKE :keyword',
            { keyword },
          );
        }),
      );
    }

    // Filter by status
    if (status) {
      queryBuilder.andWhere('room.status = :status', { status });
    }

    // Filter by building_id
    if (building_id) {
      queryBuilder.andWhere('room.building_id = :building_id', { building_id });
    }

    if (from_date) {
      const fromDateStart = moment(from_date).startOf('day').toDate();
      queryBuilder.andWhere('room.created_at >= :fromDate', {
        fromDate: fromDateStart,
      });
    }

    if (to_date) {
      const toDateEnd = moment(to_date).endOf('day').toDate();
      queryBuilder.andWhere('room.created_at <= :toDate', {
        toDate: toDateEnd,
      });
    }

    queryBuilder.skip(skip).take(itemsPerPage);

    const [rooms, count] = await queryBuilder.getManyAndCount();

    return new PageDto(
      rooms,
      new PageMetaDto({ itemCount: count, pageOptionsDto: query }),
    );
  }

  async findOne(id: number): Promise<Room> {
    const room = await this.repository.findOne({
      where: { id },
      relations: ['building'],
    });

    if (!room) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }

    return room;
  }

  async create(dto: CreateRoomDto): Promise<Room> {
    const { device_ids, ...roomData } = dto;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Tạo room
      const room = await queryRunner.manager.save(Room, roomData);

      const roomDevices = device_ids.map((device_id) => {
        return this.roomDeviceRepository.create({
          room_id: room.id,
          device_id,
        });
      });

      await queryRunner.manager.save(RoomDevice, roomDevices);

      await queryRunner.commitTransaction();

      return room;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async update(id: number, data: UpdateRoomDto): Promise<Room> {
    const { device_ids, ...roomData } = data;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Tìm room và cập nhật thông tin cơ bản
      const room = await this.repository.findOneByOrFail({ id });
      Object.assign(room, roomData);
      await queryRunner.manager.save(Room, room);

      if (device_ids && device_ids.length > 0) {
        // 2. Lấy danh sách device_id đã có trong room_device
        const existingRoomDevices = await this.roomDeviceRepository.find({
          where: { room_id: id },
        });

        const existingDeviceIds = new Set(
          existingRoomDevices.map((rd) => rd.device_id),
        );

        // 3. Lọc ra những device_id chưa tồn tại để thêm
        const newDeviceIds = device_ids.filter(
          (id) => !existingDeviceIds.has(id),
        );

        // 4. Tạo các bản ghi mới
        const newRoomDevices = this.roomDeviceRepository.create(
          newDeviceIds.map((device_id) => ({ room_id: id, device_id })),
        );

        // 5. Chèn các bản ghi mới
        await queryRunner.manager.save(RoomDevice, newRoomDevices);
      }

      await queryRunner.commitTransaction();
      return room;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number): Promise<void> {
    const room = await this.findOne(id);
    await this.repository.remove(room);
  }
}
