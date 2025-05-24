import { Get, Post, Body, Param, Delete, Put, Patch } from '@nestjs/common';
import { GenericController } from 'src/common/decorators/controller.decorator';
import { BuildingService } from './building.service';
import { Building } from '../../entities/building.entity';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';

@GenericController('building')
export class BuildingController {
  constructor(private readonly buildingService: BuildingService) {}

  @Get()
  async findAll(): Promise<{}> {
    return await this.buildingService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Building> {
    return await this.buildingService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateBuildingDto): Promise<Building> {
    return await this.buildingService.create(dto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateBuildingDto,
  ): Promise<Building> {
    return await this.buildingService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.buildingService.remove(id);
  }
}
