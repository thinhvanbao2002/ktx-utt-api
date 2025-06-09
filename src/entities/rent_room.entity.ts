import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { RentRoomStatus } from '../modules/ren-room/types/rent-room.type';
import { Room } from './room.entity';


@Entity('rent_rooms')
export class RentRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  room_id: string;

  @Column()
  max_students: number;

  @Column()
  current_students: number;

  @Column()
  user_id: number;

  @Column()
  student_code: string;

  @Column()
  class_code: string;

  @Column()
  cccd_code: string;

  @Column()
  phone: string;

  @Column()
  parent_phone: string;

  @Column()
  contract_duration: string;

 @Column({
    type: 'enum',
    enum: RentRoomStatus,
    default: RentRoomStatus.WAITING_FOR_CONFIRMATION,
  })
  status: RentRoomStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Room)
  @JoinColumn({ name: 'room_id' })
  room: Room;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
} 