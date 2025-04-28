import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Floor } from '../../entities/floor.entity';

@Injectable()
export class FloorService {
constructor(
@InjectRepository(Floor)
private repository: Repository<Floor>,
  ) {}

  async findAll(): Promise<Floor[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<Floor> {
    return await this.repository.findOne({ where: { id } });
  } 

  async create(data: Partial<Floor>): Promise<Floor> {
      return await this.repository.save(data);
  }

  async update(id: number, data: Partial<Floor>): Promise<Floor> {
      await this.repository.update(id, data);
      return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}