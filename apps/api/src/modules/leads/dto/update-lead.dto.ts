import { IsString, IsEnum, IsOptional } from 'class-validator';

export enum LeadStatusEnum {
  NEW = 'NEW',
  ASSIGNED = 'ASSIGNED',
  CALLING = 'CALLING',
  FOLLOW_UP = 'FOLLOW_UP',
  SUCCESS = 'SUCCESS',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED',
  BUSY = 'BUSY',
  NO_ANSWER = 'NO_ANSWER',
  CALL_BACK = 'CALL_BACK',
}

export class UpdateLeadDto {
  @IsEnum(LeadStatusEnum)
  status: LeadStatusEnum;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  @IsOptional()
  assignedToId?: string;
}
