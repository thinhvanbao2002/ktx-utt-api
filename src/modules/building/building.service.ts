import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Building } from '../../entities/building.entity';

@Injectable()
export class BuildingService {
constructor(
@InjectRepository(Building)
private repository: Repository<Building>,
  ) {}

  async findAll(): Promise<Building[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<Building> {
    return await this.repository.findOne({ where: { id } });
  } 

  async create(data: Partial<Building>): Promise<Building> {
      return await this.repository.save(data);
  }

  async update(id: number, data: Partial<Building>): Promise<Building> {
      await this.repository.update(id, data);
      return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}