import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { LoginPayload } from '../../../../../packages/contracts/src/auth';

export class LoginDto implements LoginPayload {
  @IsEmail({}, { message: 'Email không đúng định dạng' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6, { message: 'Mật khẩu phải từ 6 ký tự' })
  password: string;
}
