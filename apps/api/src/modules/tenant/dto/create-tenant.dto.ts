import { IsString, IsEmail, IsOptional, IsEnum, MinLength, MaxLength } from 'class-validator';

export class CreateTenantDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  code: string;

  @IsString()
  @IsOptional()
  domain?: string;

  @IsEmail()
  contactEmail: string;

  @IsString()
  @MinLength(10)
  @MaxLength(15)
  contactPhone: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  address?: string;

  @IsEnum(['ACTIVE', 'INACTIVE'])
  @IsOptional()
  status?: 'ACTIVE' | 'INACTIVE';
}
