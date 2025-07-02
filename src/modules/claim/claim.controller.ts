import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { ClaimService } from './claim.service';
import { Claim } from '../../entities/claim.entity';

@Controller('claim')
export class ClaimController {
  constructor(private readonly claimService: ClaimService) {}

  @Post()
  create(@Body() data: Partial<Claim>): Promise<Claim> {
    console.log('11111111111');
    
    return this.claimService.create(data);
  }

  @Get()
  findAll(): Promise<Claim[]> {
    return this.claimService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Claim> {
    return this.claimService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: Partial<Claim>): Promise<Claim> {
    return this.claimService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.claimService.remove(id);
  }
} 