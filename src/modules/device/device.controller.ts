import {
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  Patch,
} from '@nestjs/common';
import { GenericController } from 'src/common/decorators/controller.decorator';
import { PageDto } from 'src/common/dto/page.dto';
import { DeviceService } from './device.service';
import { Device } from '../../entities/device.entity';
import { CreateDeviceDto } from './dto/create-device.dto';
import { FilterDeviceDto } from './dto/filter-device.dto';

@GenericController('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get()
  async findAll(@Query() dto: FilterDeviceDto): Promise<PageDto<Device>> {
    return await this.deviceService.findAll(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Device> {
    return await this.deviceService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateDeviceDto): Promise<Device> {
    return await this.deviceService.create(dto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Partial<Device>,
  ): Promise<Device> {
    return await this.deviceService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.deviceService.remove(id);
  }
}
