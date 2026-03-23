import { IsOptional, IsString, IsDateString } from 'class-validator';
import { ReportFilterPayload } from '../../../../../packages/contracts/src/reports';
import { UserRole } from '../../../../../packages/contracts/src/auth';

export class QueryReportDto implements ReportFilterPayload {
  @IsOptional()
  @IsString()
  role?: UserRole;

  @IsOptional()
  @IsString()
  userName?: string;

  @IsOptional()
  @IsString()
  teamName?: string;

  @IsOptional()
  @IsDateString()
  fromDate?: string;

  @IsOptional()
  @IsDateString()
  toDate?: string;
}
