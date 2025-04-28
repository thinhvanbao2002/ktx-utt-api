import { Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { GenericController } from 'src/common/decorators/controller.decorator';
import { FloorService } from './floor.service';
import { Floor } from '../../entities/floor.entity';

@GenericController('floor')
export class FloorController {
constructor(private readonly floorService: FloorService) {}

@Get()
  async findAll(): Promise<Floor[]> {
  return await this.floorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Floor> {
    return await this.floorService.findOne(id);
  }

  @Post()
  async create(@Body() data: Partial<Floor>): Promise<Floor> {
      return await this.floorService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<Floor>): Promise<Floor> {
      return await this.floorService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.floorService.remove(id);
  }
}