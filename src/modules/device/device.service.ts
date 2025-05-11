import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageDto } from 'src/common/dto/page.dto';
import { Device } from '../../entities/device.entity';
import { CreateDeviceDto } from './dto/create-device.dto';
import { PageMetaDto } from 'src/common/dto/page-meta.dto';
import { FilterDeviceDto } from './dto/filter-device.dto';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private repository: Repository<Device>,
  ) {}

  async findAll(dto: FilterDeviceDto): Promise<PageDto<Device>> {
    console.log('🚀 ~ DeviceService ~ findAll ~ dto:', dto);
    const [devices, count] = await this.repository.findAndCount();

    return new PageDto(
      devices,
      new PageMetaDto({ itemCount: count, pageOptionsDto: dto }),
    );
  }

  async findOne(id: number): Promise<Device> {
    return await this.repository.findOne({ where: { id } });
  }

  async create(dto: CreateDeviceDto): Promise<Device> {
    return await this.repository.save(dto);
  }

  async update(id: number, data: Partial<Device>): Promise<Device> {
    await this.repository.update(id, data);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
