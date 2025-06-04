import { RentRoomStatus } from '../modules/ren-room/types/rent-room.type';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class RenRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  room_id: string;

  @Column({ type: 'varchar', length: 255 })
  user_id: string;

  @Column({ type: 'varchar', length: 10 })
  parent_phone: string;

  @Column({
    type: 'enum',
    enum: RentRoomStatus,
    default: RentRoomStatus.WAITING_FOR_CONFIRMATION,
  })
  status: RentRoomStatus;

  @Column({ type: 'int' })
  contract_duration: number;

  @Column({ type: 'date' })
  contract_signed_date: Date;

  @Column({ type: 'date' })
  contract_end_date: Date;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deleted_at: Date | null;
}
