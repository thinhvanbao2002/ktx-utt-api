import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from '../../entities/room.entity';
import { Building } from 'src/entities/building.entity';
import { RoomDevice } from 'src/entities/room_device.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Building, RoomDevice])],
  controllers: [],
  providers: [],
  exports: [],
})
export class RoomModule {}
