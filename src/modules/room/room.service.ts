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
import { plainToInstance } from 'class-transformer';
import { RoomPhoto } from 'src/entities/room_photo.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private repository: Repository<Room>,
    @InjectRepository(RoomDevice)
    private roomDeviceRepository: Repository<RoomDevice>,
    @InjectRepository(RoomPhoto)
    private roomPhotoRepository: Repository<RoomPhoto>,
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
      .leftJoinAndSelect('room.room_photos', 'room_photos')
      .leftJoinAndSelect('room.room_students', 'room_student')
      .leftJoinAndSelect('room_student.user', 'user')

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

        'room_photos.id',
        'room_photos.url',
        'room_photos.created_at',

        // 👇 Các trường user bạn muốn lấy
        'room_student.id',
        'room_student.room_id',
        'room_student.user_id',

        'user.id',
        'user.name',
        'user.phone',
        'user.email',
        'user.role',
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
    queryBuilder.orderBy('room.created_at', 'DESC');

    const [rooms, count] = await queryBuilder.getManyAndCount();

    return new PageDto(
      rooms,
      new PageMetaDto({ itemCount: count, pageOptionsDto: query }),
    );
  }

  async findOne(id: number): Promise<Room> {
    const room = await this.repository.findOne({
      where: { id },
      relations: ['building','room_type'],
    });

    if (!room) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }

    return room;
  }

  async create(dto: CreateRoomDto): Promise<Room> {
    const { devices, room_photos, ...roomData } = dto;
    console.log('🚀 ~ RoomService ~ create ~ dto:', dto);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Tạo room
      const room = await queryRunner.manager.save(Room, roomData);

      // 2. Xử lý devices
      if (devices && devices.length > 0) {
        const roomDevices = devices.map((device_id) => {
          return this.roomDeviceRepository.create({
            room_id: room.id,
            device_id,
          });
        });
        await queryRunner.manager.save(RoomDevice, roomDevices);
      }

      // 3. Xử lý room_photos
      if (room_photos && room_photos.length > 0) {
        const roomPhotos = room_photos.map((item: { url: string }) => {
          return this.roomPhotoRepository.create({
            room_id: room.id,
            url: item.url,
          });
        });
        await queryRunner.manager.save(RoomPhoto, roomPhotos);
      }

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
    const { devices, room_photos, ...roomData } = data;

    const updated_photos = room_photos.map((photo: { url: string }) => ({
      ...photo,
      url: photo.url.replace(`${process.env.API_BASE_URL}/`, ''),
    }));

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Tìm room và cập nhật thông tin cơ bản
      const room = await this.repository.findOneByOrFail({ id });
      Object.assign(room, roomData);
      await queryRunner.manager.save(Room, room);

      // 2. Xử lý devices
      if (devices) {
        // Lấy danh sách RoomDevice hiện có của room
        const existingRoomDevices: RoomDevice[] =
          await this.roomDeviceRepository.find({
            where: { room_id: id },
          });

        const existingDeviceIds = new Set(
          existingRoomDevices.map((rd: any) => rd.device_id),
        );

        // Lọc ra các device_id cần thêm mới
        const newDeviceIds = devices.filter(
          (device_id) => !existingDeviceIds.has(device_id),
        );

        // Lọc ra các RoomDevice cần xóa
        const removedRoomDeviceIds = existingRoomDevices
          .filter((rd) => !devices.includes(rd.device_id))
          .map((rd) => rd.id as number);

        if (removedRoomDeviceIds.length > 0) {
          await queryRunner.manager.delete(RoomDevice, removedRoomDeviceIds);
        }

        // Tạo các RoomDevice mới
        if (newDeviceIds.length > 0) {
          const newRoomDevices = this.roomDeviceRepository.create(
            newDeviceIds.map((device_id) => ({ room_id: id, device_id })),
          );
          await queryRunner.manager.save(RoomDevice, newRoomDevices);
        }
      }

      if (room_photos) {
        // Xóa tất cả ảnh cũ của room
        await queryRunner.manager.delete(RoomPhoto, { room_id: id });

        // Thêm lại các ảnh mới
        const newRoomPhotos = this.roomPhotoRepository.create(
          updated_photos.map((photo) => ({
            room_id: id,
            url: photo.url,
          })),
        );
        await queryRunner.manager.save(RoomPhoto, newRoomPhotos);
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
