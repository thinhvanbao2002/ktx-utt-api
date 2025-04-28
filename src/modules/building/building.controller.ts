import { Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { GenericController } from 'src/common/decorators/controller.decorator';
import { BuildingService } from './building.service';
import { Building } from '../../entities/building.entity';

@GenericController('building')
export class BuildingController {
constructor(private readonly buildingService: BuildingService) {}

@Get()
  async findAll(): Promise<Building[]> {
  return await this.buildingService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Building> {
    return await this.buildingService.findOne(id);
  }

  @Post()
  async create(@Body() data: Partial<Building>): Promise<Building> {
      return await this.buildingService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<Building>): Promise<Building> {
      return await this.buildingService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.buildingService.remove(id);
  }
}