import { Injectable } from '@nestjs/common';
import { CreateAdminDashboardDto } from './dto/create-admin-dashboard.dto';
import { UpdateAdminDashboardDto } from './dto/update-admin-dashboard.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { UserRole } from 'src/types/user.types';
import { Room } from 'src/entities/room.entity';

@Injectable()
export class AdminDashboardService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  async getDataDashboard() {
    const studentCount = await this.repository.count({
      where: { role: UserRole.STUDENT },
    });

    const roomCount = await this.roomRepository.count();
    return {
      student: studentCount,
      room: roomCount,
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
}
