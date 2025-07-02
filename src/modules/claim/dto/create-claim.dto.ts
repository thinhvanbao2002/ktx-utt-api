import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ClaimStatus } from '../../../entities/claim.entity';

export class CreateClaimDto {
  @IsString()
  student_code: string;

  @IsString()
  student_name: string;

  @IsString()
  room_number: string;

  @IsString()
  content: string;

  @IsString()
  @IsOptional()
  supporter?: string;

  @IsEnum(ClaimStatus)
  @IsOptional()
  status?: ClaimStatus;
} 