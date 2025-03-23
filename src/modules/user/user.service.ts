import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';

@Injectable()
export class UserService {
constructor(
@InjectRepository(User)
private repository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<User> {
    return this.repository.findOne({ where: { id } });
  } 

  create(data: Partial<User>): Promise<User> {
      return this.repository.save(data);
  }

  async update(id: number, data: Partial<User>): Promise<User> {
      await this.repository.update(id, data);
      return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}