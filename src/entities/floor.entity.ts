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
import { Building } from './building.entity';

@Entity()
export class Floor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  building_id: number;

  @ManyToOne(() => Building)
  @JoinColumn({ name: 'building_id' }) // Liên kết với cột building_id
  building: Building; // Thuộc tính quan hệ

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deleted_at: Date | null;
}
