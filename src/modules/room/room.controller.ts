import {
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Patch,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { GenericController } from 'src/common/decorators/controller.decorator';
import { PageDto } from 'src/common/dto/page.dto';
import { RoomService } from './room.service';
import { Room } from '../../entities/room.entity';
import { FilterRoomDto } from './dto/filter-room.dto';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@GenericController('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll(@Query() query: FilterRoomDto): Promise<PageDto<Room>> {
    return await this.roomService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Room> {
    return await this.roomService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateRoomDto): Promise<Room> {
    return await this.roomService.create(dto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateRoomDto,
  ): Promise<Room> {
    return await this.roomService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.roomService.remove(id);
  }
}
