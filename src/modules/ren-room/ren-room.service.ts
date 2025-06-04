import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageDto } from 'src/common/dto/page.dto';
import { RenRoom } from '../../entities/ren-room.entity';
import { CreateRenRoomDto } from '../rent-room/dto/create-ren-room.dto';
import { PageMetaDto } from 'src/common/dto/page-meta.dto';
import { FilterRenRoomDto } from './dto/filter-ren-room.dto';
import { TriggerWorkflowDto } from '../rent-room/dto/trigger-workflow.dto';

@Injectable()
export class RenRoomService {
  constructor(
    @InjectRepository(RenRoom)
    private repository: Repository<RenRoom>,
  ) {}

  async findAll(query: FilterRenRoomDto): Promise<PageDto<RenRoom>> {
    const [rentRooms, count] = await this.repository.findAndCount();

    return new PageDto(
      rentRooms,
      new PageMetaDto({ itemCount: count, pageOptionsDto: query }),
    );
  }

  async findOne(id: number): Promise<RenRoom> {
    return await this.repository.findOne({ where: { id } });
  }

  async create(dto: CreateRenRoomDto): Promise<RenRoom> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }

  async update(id: number, dto: CreateRenRoomDto): Promise<RenRoom> {
    await this.repository.update(id, dto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async triggerWorkflow(dto: TriggerWorkflowDto): Promise<void> {
    const { action, ren_room_id } = dto;
    const renRoom = await this.findOne(ren_room_id);
    if (!renRoom) {
      throw new NotFoundException('Yêu cầu thuê phòng không tồn tại!');
    }

  }
  
}
