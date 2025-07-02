import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Claim } from '../../entities/claim.entity';
import { ClaimService } from './claim.service';
import { ClaimController } from './claim.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Claim])],
  providers: [ClaimService],
  controllers: [ClaimController],
  exports: [ClaimService],
})
export class ClaimModule {} 