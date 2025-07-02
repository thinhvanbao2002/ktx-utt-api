import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ClaimStatus } from '../../../entities/claim.entity';

export class UpdateClaimDto {
  @IsString()
  @IsOptional()
  supporter?: string;

  @IsEnum(ClaimStatus)
  @IsOptional()
  status?: ClaimStatus;
} 