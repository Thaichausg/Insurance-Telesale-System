import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum ExportFormatEnum {
  CSV = 'CSV',
  EXCEL = 'EXCEL',
  PDF = 'PDF'
}

export class RequestExportDto {
  @IsEnum(ExportFormatEnum)
  format: ExportFormatEnum;

  @IsString()
  @IsOptional()
  startDate?: string;

  @IsString()
  @IsOptional()
  endDate?: string;

  @IsString()
  @IsOptional()
  role?: string;

  @IsString()
  @IsOptional()
  keyword?: string;
}
