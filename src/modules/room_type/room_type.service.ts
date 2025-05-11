import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageDto } from 'src/common/dto/page.dto';
import { RoomType } from '../../entities/room_type.entity';
import { FilterRoomTypeDto } from './dto/filter-room-type.dto';
import { PageMetaDto } from 'src/common/dto/page-meta.dto';
import { CreateRoomTypeDto } from './dto/create-room_type.dto';
import { UpdateRoomTypeDto } from './dto/update-room_type.dto';

@Injectable()
export class RoomTypeService {
  constructor(
    @InjectRepository(RoomType)
    private repository: Repository<RoomType>,
  ) {}

  async findAll(dto: FilterRoomTypeDto): Promise<PageDto<RoomType>> {
    const [roomTypes, count] = await this.repository.findAndCount();

    return new PageDto(
      roomTypes,
      new PageMetaDto({ itemCount: count, pageOptionsDto: dto }),
    );
  }

  async findOne(id: number): Promise<RoomType> {
    return await this.repository.findOne({ where: { id } });
  }

  async create(dto: CreateRoomTypeDto): Promise<RoomType> {
    return await this.repository.save(dto);
  }

  async update(id: number, dto: UpdateRoomTypeDto): Promise<RoomType> {
    await this.repository.update(id, dto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
