import { Module } from '@nestjs/common';
import { RoomDeviceController } from './room_device.controller';
import { RoomDeviceService } from './room_device.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomDevice } from '../../entities/room_device.entity';
import { Room } from 'src/entities/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomDevice, Room, RoomDevice])],
  controllers: [RoomDeviceController],
  providers: [RoomDeviceService],
  exports: [RoomDeviceService],
})
export class RoomDeviceModule {}
