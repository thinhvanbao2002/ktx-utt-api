import { Module } from '@nestjs/common';
import { FloorController } from './floor.controller';
import { FloorService } from './floor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Floor } from '../../entities/floor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Floor])],
  controllers: [FloorController],
  providers: [FloorService],
  exports: [FloorService],
})
export class FloorModule {}
