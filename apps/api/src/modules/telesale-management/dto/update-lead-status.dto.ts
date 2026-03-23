import { IsEnum, IsOptional, IsString, IsNumber } from 'class-validator';
import { LeadStatus, UpdateLeadStatusPayload } from '../../../../../packages/contracts/src/leads';

export class UpdateLeadStatusDto implements UpdateLeadStatusPayload {
  @IsEnum(['NEW', 'ASSIGNED', 'CALLING', 'FOLLOW_UP', 'SUCCESS', 'REJECTED', 'EXPIRED', 'BUSY', 'NO_ANSWER', 'CALL_BACK'])
  status: LeadStatus;

  @IsString()
  @IsOptional()
  note?: string;

  @IsString()
  @IsOptional()
  followUpDate?: string;

  @IsNumber()
  @IsOptional()
  callDuration?: number;
}
