import { Module } from '@nestjs/common';
import { RoomStudentController } from './room_student.controller';
import { RoomStudentService } from './room_student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomStudent } from '../../entities/room_student.entity';

@Module({
imports: [TypeOrmModule.forFeature([RoomStudent])],
controllers: [RoomStudentController],
providers: [RoomStudentService],
exports: [RoomStudentService],
})
export class RoomStudentModule {}