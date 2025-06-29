import { Injectable } from '@nestjs/common';
import { CreateAdminDashboardDto } from './dto/create-admin-dashboard.dto';
import { UpdateAdminDashboardDto } from './dto/update-admin-dashboard.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { UserRole } from 'src/types/user.types';
import { Room } from 'src/entities/room.entity';
import { RentRoom } from 'src/entities/rent_room.entity';
import { Between } from 'typeorm';
import { RentRoomStatus } from '../ren-room/types/rent-room.type';

@Injectable()
export class AdminDashboardService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    @InjectRepository(RentRoom)
    private rentRoomRepository: Repository<RentRoom>,
  ) {}

  async getDataDashboard() {
    const studentCount = await this.repository.count({
      where: { role: UserRole.STUDENT },
    });

    const roomCount = await this.roomRepository.count();
    const countCategories = await this.rentRoomRepository.count({
      where: { status: RentRoomStatus.DRAFT },
    });
    return {
      student: studentCount,
      room: roomCount,
      countCategories,
    };
  }

  findAll() {
    return `This action returns all adminDashboard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adminDashboard`;
  }

  update(id: number, updateAdminDashboardDto: UpdateAdminDashboardDto) {
    return `This action updates a #${id} adminDashboard`;
  }

  remove(id: number) {
    return `This action removes a #${id} adminDashboard`;
  }

  async getStudentRegisterStatistics(year: number) {
    const results = [];
    for (let month = 1; month <= 12; month++) {
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 0, 23, 59, 59, 999);
      const count = await this.rentRoomRepository.count({
        where: {
          created_at: Between(start, end),
        },
      });
      results.push({ month, count });
    }
    return results;
  }
}
