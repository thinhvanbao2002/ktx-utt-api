import { Module } from '@nestjs/common';
import { RoomTypeController } from './room_type.controller';
import { RoomTypeService } from './room_type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomType } from '../../entities/room_type.entity';

@Module({
imports: [TypeOrmModule.forFeature([RoomType])],
controllers: [RoomTypeController],
providers: [RoomTypeService],
exports: [RoomTypeService],
})
export class RoomTypeModule {}