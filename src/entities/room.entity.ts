import { CommonStatus } from '../common/types/common.type';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Building } from './building.entity';
import { RoomType } from './room_type.entity';
import { RoomDevice } from './room_device.entity';
import { RoomStatus } from '../modules/room/types/room.type';
import { RoomPhoto } from './room_photo.entity';
import { RoomStudent } from './room_student.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  room_number: string;

  @Column({ type: 'int', default: 0 })
  current_capacity: number;

  @Column()
  building_id: number;

  @Column()
  floor: number;

  @ManyToOne(() => Building)
  @JoinColumn({ name: 'building_id' })
  building: Building;

  @Column()
  room_type_id: number;

  @ManyToOne(() => RoomType)
  @JoinColumn({ name: 'room_type_id' })
  room_type: RoomType;

  @Column({
    type: 'enum',
    enum: RoomStatus,
    default: RoomStatus.AVAILABLE,
  })
  status: RoomStatus;

  @OneToMany(() => RoomDevice, (roomDevice) => roomDevice.room)
  room_devices: RoomDevice[];

  @OneToMany(() => RoomPhoto, (roomPhoto) => roomPhoto.room, { eager: true })
  room_photos: RoomPhoto[];

  @OneToMany(() => RoomStudent, (roomStudent) => roomStudent.room, {
    eager: true,
  })
  room_students: RoomStudent[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deleted_at: Date | null;
}
