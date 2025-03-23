import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../entities/category.entity';

@Injectable()
export class CategoryService {
constructor(
@InjectRepository(Category)
private repository: Repository<Category>,
  ) {}

  findAll(): Promise<Category[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<Category> {
    return this.repository.findOne({ where: { id } });
  } 

  create(data: Partial<Category>): Promise<Category> {
      return this.repository.save(data);
  }

  async update(id: number, data: Partial<Category>): Promise<Category> {
      await this.repository.update(id, data);
      return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}