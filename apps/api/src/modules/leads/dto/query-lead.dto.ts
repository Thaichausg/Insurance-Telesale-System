import { IsString, IsOptional, IsEnum } from 'class-validator';
import { LeadStatusEnum } from './update-lead.dto';

export class QueryLeadDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsEnum(LeadStatusEnum)
  @IsOptional()
  status?: LeadStatusEnum;

  @IsString()
  @IsOptional()
  source?: string;
}
