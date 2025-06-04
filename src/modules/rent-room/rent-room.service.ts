import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RentRoom } from '../../entities/rent_room.entity';
import { CreateRentRoomDto } from './dto/create-rent-room.dto';
import { Room } from '../../entities/room.entity';
import { RentRoomStatus } from '@modules/ren-room/types/rent-room.type';
import { FilterRentRoomDto } from './dto/filter-rent-room.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { PageMetaDto } from 'src/common/dto/page-meta.dto';
import { TriggerWorkflowDto } from './dto/trigger-workflow.dto';
import { UserRole } from 'src/types/user.types';

@Injectable()
export class RentRoomService {
  constructor(
    @InjectRepository(RentRoom)
    private rentRoomRepository: Repository<RentRoom>,
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  async create(createRentRoomDto: CreateRentRoomDto): Promise<RentRoom> {
    // Kiểm tra phòng có tồn tại không
    const room = await this.roomRepository.findOne({
      where: { id: +createRentRoomDto.room_id },
      relations: ['room_type'],
    });

    if (!room) {
      throw new NotFoundException(
        `Room with ID ${createRentRoomDto.room_id} not found`,
      );
    }

    // Kiểm tra số lượng sinh viên hiện tại
    if (room.current_capacity >= room.room_type.max_student) {
      throw new BadRequestException('Room is full');
    }

    // Tạo yêu cầu thuê phòng
    const rentRoom = this.rentRoomRepository.create({
      ...createRentRoomDto,
      status: RentRoomStatus.DRAFT,
    });

    return this.rentRoomRepository.save(rentRoom);
  }

  async findAllRentRoom(dto: FilterRentRoomDto, req: any): Promise<PageDto<RentRoom>> {
    console.log("🚀 ~ RentRoomService ~ findAllRentRoom ~ req:", req.user)
    const queryBuilder = this.rentRoomRepository.createQueryBuilder('rentRoom')
      .leftJoinAndSelect('rentRoom.room', 'room')
      .leftJoinAndSelect('rentRoom.user', 'user');

    // If user is not admin, only show their records
    if (req.user.role !== UserRole.ADMIN) {
      queryBuilder.where('rentRoom.user_id = :userId', { userId: req.user.id });
    }

    const [rentRooms, count] = await queryBuilder.getManyAndCount();

    return new PageDto(
      rentRooms,
      new PageMetaDto({ itemCount: count, pageOptionsDto: dto }),
    );
  }

  async findOne(id: number): Promise<RentRoom> {
    console.log("🚀 ~ RentRoomService ~ findOne ~ id:", id)
    const rentRoom = await this.rentRoomRepository.findOne({
      where: { id },
      relations: ['room', 'user','room.room_type'],
    });

    if (!rentRoom) {
      throw new NotFoundException(`Rent room request with ID ${id} not found`);
    }

    return rentRoom;
  }

  async findByUserId(userId: number): Promise<RentRoom[]> {
    return this.rentRoomRepository.find({
      where: { user_id: userId },
      relations: ['room', 'user'],
      order: {
        created_at: 'DESC',
      },
    });
  }

  async triggerWorkFlow(dto: TriggerWorkflowDto): Promise<RentRoom> {
    const { action, ren_room_id } = dto;
    const renRoom = await this.rentRoomRepository.findOne({
      where: { id: ren_room_id }
    });
    console.log("🚀 ~ RentRoomService ~ triggerWorkFlow ~ renRoom:", renRoom)
    if (!renRoom) {
      throw new NotFoundException('Yêu cầu thuê phòng không tồn tại!');
    }

    renRoom.status = action

    return this.rentRoomRepository.save(renRoom);
  }

  // async updateStatus(id: number, status: string): Promise<RentRoom> {
  //   const rentRoom = await this.findOne(id);
  //   rentRoom.status = status;
  //   return this.rentRoomRepository.save(rentRoom);
  // }
}
