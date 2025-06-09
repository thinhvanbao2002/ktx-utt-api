import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentRoomService } from './rent-room.service';
import { RentRoomController } from './rent-room.controller';
import { RentRoom } from '../../entities/rent_room.entity';
import { Room } from '../../entities/room.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '@modules/auth/auth.module';
import { RoomStudent } from 'src/entities/room_student.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RentRoom, Room,RoomStudent]),
    AuthModule,
  ],
  controllers: [RentRoomController],
  providers: [RentRoomService],
})
export class RentRoomModule {}
