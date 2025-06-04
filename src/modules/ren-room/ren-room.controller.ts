import { Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { GenericController } from 'src/common/decorators/controller.decorator';
import { PageDto } from 'src/common/dto/page.dto';
import { RenRoomService } from './ren-room.service';
import { RenRoom } from '../../entities/ren-room.entity';
import { CreateRenRoomDto } from '../rent-room/dto/create-ren-room.dto';
import { FilterRenRoomDto } from './dto/filter-ren-room.dto';
import { TriggerWorkflowDto } from '../rent-room/dto/trigger-workflow.dto';

@GenericController('ren-room')
export class RenRoomController {
  constructor(private readonly renRoomService: RenRoomService) {}

  @Get()
  async findAll(dto: FilterRenRoomDto): Promise<PageDto<RenRoom>> {
    return await this.renRoomService.findAll(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<RenRoom> {
    return await this.renRoomService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateRenRoomDto): Promise<RenRoom> {
    return await this.renRoomService.create(dto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: CreateRenRoomDto,
  ): Promise<RenRoom> {
    return await this.renRoomService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.renRoomService.remove(id);
  }

  @Post('trigger-workflow')
  async triggerWorkflow(@Body() dto: TriggerWorkflowDto): Promise<void> {
    return await this.renRoomService.triggerWorkflow(dto);
  }
}
