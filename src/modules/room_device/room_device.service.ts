import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageDto } from 'src/common/dto/page.dto';
import { RoomDevice } from '../../entities/room_device.entity';
import { UpdateRoomDeviceDto } from './dto/update-room_device.dto';
import { CreateRoomDeviceDto } from './dto/create-room_device.dto';
import { FilterRoomDeviceDto } from './dto/filter-room_device.dto';
import { PageMetaDto } from 'src/common/dto/page-meta.dto';

@Injectable()
export class RoomDeviceService {
  constructor(
    @InjectRepository(RoomDevice)
    private repository: Repository<RoomDevice>,
  ) {}

  async findAll(
    @Query() query: FilterRoomDeviceDto,
  ): Promise<PageDto<RoomDevice>> {
    const [devices, count] = await this.repository.findAndCount();
    return new PageDto(
      devices,
      new PageMetaDto({ itemCount: count, pageOptionsDto: query }),
    );
  }

  async findOne(id: number): Promise<RoomDevice> {
    return await this.repository.findOne({ where: { id } });
  }

  async create(dto: CreateRoomDeviceDto): Promise<RoomDevice> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }

  async update(id: number, dto: UpdateRoomDeviceDto): Promise<RoomDevice> {
    await this.repository.update(id, dto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
