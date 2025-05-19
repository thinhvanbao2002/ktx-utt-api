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
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomDevice } from './entities/room_device.entity';
import { Room } from './entities/room.entity';
import { RoomDeviceModule } from '@modules/room_device/room_device.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
  ],
})
export class AppModule {}
