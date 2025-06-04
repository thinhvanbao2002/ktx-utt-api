import { Module } from '@nestjs/common';
import { RenRoomController } from './ren-room.controller';
import { RenRoomService } from './ren-room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RenRoom } from '../../entities/ren-room.entity';

@Module({
imports: [TypeOrmModule.forFeature([RenRoom])],
controllers: [RenRoomController],
providers: [RenRoomService],
exports: [RenRoomService],
})
export class RenRoomModule {}