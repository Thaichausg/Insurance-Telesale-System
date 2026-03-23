import { IsEmail, IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';
import { LeadSource, CreateLeadPayload, LeadStatus } from '../../../../../packages/contracts/src/leads';

export class CreateLeadDto implements CreateLeadPayload {
  @IsString()
  @IsNotEmpty({ message: 'Tên khách hàng không được để trống' })
  customerName: string;

  @IsString()
  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  phoneNumber: string;

  @IsEmail({}, { message: 'Email không đúng định dạng' })
  @IsOptional()
  email?: string;

  @IsEnum(['FACEBOOK', 'GOOGLE', 'ZALO', 'REFERRAL', 'DIRECT'])
  source: LeadSource;

  @IsString()
  @IsOptional()
  groupTag?: string;

  @IsString()
  @IsOptional()
  interestProduct?: string;

  @IsEnum(['NEW', 'ASSIGNED', 'CALLING', 'FOLLOW_UP', 'SUCCESS', 'REJECTED', 'EXPIRED', 'BUSY', 'NO_ANSWER', 'CALL_BACK'])
  @IsOptional()
  status?: LeadStatus;

  @IsString()
  @IsOptional()
  note?: string;
}
