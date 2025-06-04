import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageDto } from 'src/common/dto/page.dto';
import { RoomStudent } from '../../entities/room_student.entity';
import { CreateRoomStudentDto } from './dto/create-room_student.dto';

@Injectable()
export class RoomStudentService {
  constructor(
    @InjectRepository(RoomStudent)
    private repository: Repository<RoomStudent>,
  ) {}

  async findOne(id: number): Promise<RoomStudent> {
    return await this.repository.findOne({ where: { id } });
  }

  async create(dto: CreateRoomStudentDto): Promise<RoomStudent> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }

  async update(id: number, dto: CreateRoomStudentDto): Promise<RoomStudent> {
    await this.repository.update(id, dto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
