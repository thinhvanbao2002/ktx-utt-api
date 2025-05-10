import { Module } from '@nestjs/common';
import { BuildingController } from './building.controller';
import { BuildingService } from './building.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Building } from '../../entities/building.entity';
import { Floor } from 'src/entities/floor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Building, Floor])],
  controllers: [BuildingController],
  providers: [BuildingService],
  exports: [BuildingService],
})
export class BuildingModule {}
