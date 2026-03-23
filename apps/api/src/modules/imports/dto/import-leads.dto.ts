import { IsArray, ValidateNested, IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateLeadPayload } from '../../../../../packages/contracts/src/leads';

export class ImportLeadRowDto implements Partial<CreateLeadPayload> {
  @IsString()
  @IsNotEmpty({ message: 'Tên khách hàng không được để trống' })
  customerName: string;

  @IsString()
  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  phoneNumber: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  source: any; // LeadSource contract

  @IsString()
  @IsOptional()
  groupTag?: string;

  @IsString()
  @IsOptional()
  interestProduct?: string;
}

export class ImportLeadsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImportLeadRowDto)
  leads: ImportLeadRowDto[];

  @IsString()
  @IsOptional()
  tenantId?: string;
}
