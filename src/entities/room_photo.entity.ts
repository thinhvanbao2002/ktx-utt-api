import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Room } from './room.entity';
import { Expose } from 'class-transformer';

@Entity()
export class RoomPhoto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  room_id: number;

  @ManyToOne(() => Room, (room) => room.room_photos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'room_id' })
  room: Room;

  @Column()
  url: string;

  @Expose()
  get full_url(): string {
    const baseUrl = process.env.API_BASE_URL || 'http://localhost:3009';
    return `${baseUrl}/${this.url}`;
  }

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deleted_at: Date | null;
}
