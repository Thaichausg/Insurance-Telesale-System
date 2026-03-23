import { IsString, IsOptional, MinLength, MaxLength, IsBoolean } from 'class-validator';

export class UpdateReplyTemplateDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @IsOptional()
  keyword?: string;

  @IsString()
  @MinLength(10)
  @MaxLength(1000)
  @IsOptional()
  response?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
