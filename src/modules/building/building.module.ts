import { Module } from '@nestjs/common';
import { BuildingController } from './building.controller';
import { BuildingService } from './building.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Building } from '../../entities/building.entity';
import { Floor } from 'src/entities/floor.entity';
import { Room } from 'src/entities/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Building, Floor, Room])],
  controllers: [BuildingController],
  providers: [BuildingService],
  exports: [BuildingService],
})
export class BuildingModule {}
