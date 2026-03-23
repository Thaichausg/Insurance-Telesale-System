import { IsString, IsEnum, IsOptional, IsBooleanString } from 'class-validator';
import { UserRoleEnum } from './create-user.dto';

export class QueryUserDto {
  @IsEnum(UserRoleEnum)
  @IsOptional()
  role?: UserRoleEnum;

  @IsString()
  @IsOptional()
  search?: string;

  @IsBooleanString()
  @IsOptional()
  isActive?: string;
}
