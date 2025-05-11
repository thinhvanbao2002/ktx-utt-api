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
import { RoomTypeService } from './room_type.service';
import { RoomType } from '../../entities/room_type.entity';
import { FilterRoomTypeDto } from './dto/filter-room-type.dto';
import { CreateRoomTypeDto } from './dto/create-room_type.dto';
import { UpdateRoomTypeDto } from './dto/update-room_type.dto';

@GenericController('room_type')
export class RoomTypeController {
  constructor(private readonly roomTypeService: RoomTypeService) {}

  @Get()
  async findAll(@Query() query: FilterRoomTypeDto): Promise<PageDto<RoomType>> {
    return await this.roomTypeService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<RoomType> {
    return await this.roomTypeService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateRoomTypeDto): Promise<RoomType> {
    return await this.roomTypeService.create(dto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateRoomTypeDto,
  ): Promise<RoomType> {
    console.log('🚀 ~ RoomTypeController ~ data:', dto);

    return await this.roomTypeService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.roomTypeService.remove(id);
  }
}
