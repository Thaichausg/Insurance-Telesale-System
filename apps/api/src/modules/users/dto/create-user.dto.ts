import { IsString, IsEmail, IsEnum, IsOptional, MinLength, MaxLength } from 'class-validator';

export enum UserRoleEnum {
  SUPER_ADMIN = 'SUPER_ADMIN',
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN',
  TELESALE = 'TELESALE',
}

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(UserRoleEnum)
  role: UserRoleEnum;

  @IsString()
  @IsOptional()
  parentId?: string | null;

  @IsString()
  @MinLength(6)
  password: string;
}
