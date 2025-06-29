import { Module } from '@nestjs/common';
import { AdminDashboardService } from './admin-dashboard.service';
import { AdminDashboardController } from './admin-dashboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Room } from 'src/entities/room.entity';
import { RentRoom } from 'src/entities/rent_room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Room, RentRoom])],
  controllers: [AdminDashboardController],
  providers: [AdminDashboardService],
})
export class AdminDashboardModule {}
