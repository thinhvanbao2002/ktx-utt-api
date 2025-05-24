import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Building } from '../../entities/building.entity';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { PageMetaDto } from 'src/common/dto/page-meta.dto';

@Injectable()
export class BuildingService {
  constructor(
    @InjectRepository(Building)
    private repository: Repository<Building>,
  ) {}

  async findAll(): Promise<object> {
    const [buildings, count] = await this.repository.findAndCount();

    return { data: buildings };
  }

  async findOne(id: number): Promise<Building> {
    return await this.repository.findOne({ where: { id } });
  }

  async create(dto: CreateBuildingDto): Promise<Building> {
    return await this.repository.save(dto);
  }

  async update(id: number, data: UpdateBuildingDto): Promise<Building> {
    console.log('🚀 ~ BuildingService ~ update ~ data:', data);
    await this.repository.update(id, data);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
