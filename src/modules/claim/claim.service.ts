import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Claim } from '../../entities/claim.entity';

@Injectable()
export class ClaimService {
  constructor(
    @InjectRepository(Claim)
    private readonly claimRepository: Repository<Claim>,
  ) {}

  async create(data: Partial<Claim>): Promise<Claim> {
    const claim = this.claimRepository.create(data);
    return this.claimRepository.save(claim);
  }

  async findAll(): Promise<Claim[]> {
    return this.claimRepository.find();
  }

  async findOne(id: number): Promise<Claim> {
    return this.claimRepository.findOne({ where: { id } });
  }

  async update(id: number, data: Partial<Claim>): Promise<Claim> {
    await this.claimRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.claimRepository.delete(id);
  }
} 