import { AuthModule } from '@modules/auth/auth.module';
import { BuildingModule } from '@modules/building/building.module';
import { DeviceModule } from '@modules/device/device.module';
import { FloorModule } from '@modules/floor/floor.module';
import { RoomModule } from '@modules/room/room.module';
import { RoomTypeModule } from '@modules/room_type/room_type.module';
import { UploadModule } from '@modules/upload/upload.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomDeviceModule } from '@modules/room_device/room_device.module';
import { RoomPhoto } from './entities/room_photo.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AdminDashboardModule } from './modules/admin-dashboard/admin-dashboard.module';
import { RoomStudentModule } from '@modules/room_student/room_student.module';
import { RenRoomModule } from '@modules/ren-room/ren-room.module';
import { RentRoomModule } from '@modules/rent-room/rent-room.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false,
    }),
    AuthModule,
    UserModule,
    FloorModule,
    BuildingModule,
    RoomTypeModule,
    DeviceModule,
    RoomModule,
    UploadModule,
    RoomDeviceModule,
    RoomPhoto,
    AdminDashboardModule,
    RoomStudentModule,
    RenRoomModule,
    RentRoomModule,
  ],
})
export class AppModule {}
