import { Module } from '@nestjs/common';
import { FloorController } from './floor.controller';
import { FloorService } from './floor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Floor } from '../../entities/floor.entity';
import { Building } from 'src/entities/building.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Floor, Building])],
  controllers: [FloorController],
  providers: [FloorService],
  exports: [FloorService],
})
export class FloorModule {}
