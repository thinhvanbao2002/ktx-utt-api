import { Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { GenericController } from 'src/common/decorators/controller.decorator';
import { PageDto } from 'src/common/dto/page.dto';
import { RoomStudentService } from './room_student.service';
import { RoomStudent } from '../../entities/room_student.entity';
import { CreateRoomStudentDto } from './dto/create-room_student.dto';

@GenericController('room_student')
export class RoomStudentController {
  constructor(private readonly roomStudentService: RoomStudentService) {}

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<RoomStudent> {
    return await this.roomStudentService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateRoomStudentDto): Promise<RoomStudent> {
    return await this.roomStudentService.create(dto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: CreateRoomStudentDto,
  ): Promise<RoomStudent> {
    return await this.roomStudentService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.roomStudentService.remove(id);
  }
}
