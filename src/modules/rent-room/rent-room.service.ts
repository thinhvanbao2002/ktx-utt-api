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
import { RoomStudent } from '../../entities/room_student.entity';

@Injectable()
export class RentRoomService {
  constructor(
    @InjectRepository(RentRoom)
    private rentRoomRepository: Repository<RentRoom>,
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    @InjectRepository(RoomStudent)
    private roomStudentRepository: Repository<RoomStudent>,
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
    console.log("🚀 ~ RentRoomService ~ triggerWorkFlow ~ dto:", dto)
    
    const renRoom = await this.rentRoomRepository.findOne({
      where: { id: ren_room_id },
      relations: ['room', 'user']
    });

    console.log("🚀 ~ RentRoomService ~ triggerWorkFlow ~ renRoom:", {
      id: renRoom?.id,
      room_id: renRoom?.room_id,
      user_id: renRoom?.user_id,
      status: renRoom?.status
    });

    if (!renRoom) {
      throw new NotFoundException('Yêu cầu thuê phòng không tồn tại!');
    }

    renRoom.status = action;

    // If status is completed, add student to room and update room capacity
    if (action === RentRoomStatus.COMPLETED) {
      // Check if room exists
      const room = await this.roomRepository.findOne({
        where: { id: +renRoom.room_id },
        relations: ['room_type']
      });

      console.log("🚀 ~ RentRoomService ~ triggerWorkFlow ~ room:", {
        id: room?.id,
        current_capacity: room?.current_capacity,
        max_student: room?.room_type?.max_student
      });

      if (!room) {
        throw new NotFoundException('Phòng không tồn tại!');
      }

      // Check if room is full
      if (room.current_capacity >= room.room_type.max_student) {
        throw new BadRequestException('Phòng đã đầy!');
      }

      // Create room student record
      const payLoadRoomStudent = {
        room_id: +renRoom.room_id,
        user_id: renRoom.user_id
      }
      console.log("🚀 ~ RentRoomService ~ triggerWorkFlow ~ payLoadRoomStudent:", payLoadRoomStudent);
      
      try {
        const roomStudent = this.roomStudentRepository.create({
          room_id: +renRoom.room_id,
          user_id: renRoom.user_id
        });
        console.log("🚀 ~ RentRoomService ~ triggerWorkFlow ~ roomStudent entity:", roomStudent);
        
        const savedRoomStudent = await this.roomStudentRepository.save(roomStudent);
        console.log("🚀 ~ RentRoomService ~ triggerWorkFlow ~ savedRoomStudent:", savedRoomStudent);

        // Update room capacity
        const updatedRoom = await this.roomRepository.findOne({
          where: { id: +renRoom.room_id }
        });
        
        if (updatedRoom) {
          updatedRoom.current_capacity += 1;
          await this.roomRepository.save(updatedRoom);
          console.log("🚀 ~ RentRoomService ~ triggerWorkFlow ~ updatedRoom:", {
            id: updatedRoom.id,
            current_capacity: updatedRoom.current_capacity
          });
        }
      } catch (error) {
        console.error("🚀 ~ RentRoomService ~ triggerWorkFlow ~ error:", error);
        throw error;
      }
    }

    return this.rentRoomRepository.save(renRoom);
  }

  async terminateContract(id: number): Promise<RentRoom> {
    // Find the rent room record
    const rentRoom = await this.rentRoomRepository.findOne({
      where: { id },
      relations: ['room', 'user']
    });

    if (!rentRoom) {
      throw new NotFoundException('Yêu cầu thuê phòng không tồn tại!');
    }

    // Find the room student record
    const roomStudent = await this.roomStudentRepository.findOne({
      where: {
        room_id: +rentRoom.room_id,
        user_id: rentRoom.user_id
      }
    });

    if (roomStudent) {
      // Soft delete the room student record
      await this.roomStudentRepository.softDelete(roomStudent.id);

      // Update room capacity
      const room = await this.roomRepository.findOne({
        where: { id: +rentRoom.room_id }
      });

      if (room) {
        room.current_capacity = Math.max(0, room.current_capacity - 1);
        await this.roomRepository.save(room);
      }
    }

    // Update rent room status to terminated
    rentRoom.status = RentRoomStatus.TERMINATED;
    return this.rentRoomRepository.save(rentRoom);
  }

  // async updateStatus(id: number, status: string): Promise<RentRoom> {
  //   const rentRoom = await this.findOne(id);
  //   rentRoom.status = status;
  //   return this.rentRoomRepository.save(rentRoom);
  // }
}
