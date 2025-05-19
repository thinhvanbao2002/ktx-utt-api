import { Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { GenericController } from 'src/common/decorators/controller.decorator';
import { PageDto } from 'src/common/dto/page.dto';
import { RoomDeviceService } from './room_device.service';
import { RoomDevice } from '../../entities/room_device.entity';
import { CreateRoomDeviceDto } from './dto/create-room_device.dto';
import { UpdateRoomDeviceDto } from './dto/update-room_device.dto';
import { FilterRoomDeviceDto } from './dto/filter-room_device.dto';

@GenericController('room_device')
export class RoomDeviceController {
  constructor(private readonly roomDeviceService: RoomDeviceService) {}

  @Get()
  async findAll(
    @Query() dto: FilterRoomDeviceDto,
  ): Promise<PageDto<RoomDevice>> {
    return await this.roomDeviceService.findAll(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<RoomDevice> {
    return await this.roomDeviceService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateRoomDeviceDto): Promise<RoomDevice> {
    return await this.roomDeviceService.create(dto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateRoomDeviceDto,
  ): Promise<RoomDevice> {
    return await this.roomDeviceService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.roomDeviceService.remove(id);
  }
}
