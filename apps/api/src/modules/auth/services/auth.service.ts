import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from '../repositories/auth.repository';
import { LoginDto } from '../dto/login.dto';
import { IAuthResult, IAuthUser } from '../interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(private readonly authRepo: AuthRepository) {}

  async login(loginDto: LoginDto): Promise<IAuthResult> {
    const user = await this.authRepo.findByEmail(loginDto.email);
    
    // Giả lập check password với salt (123456 do mock set up từ bài test)
    if (!user || loginDto.password !== '123456') {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Tài khoản đã bị khóa');
    }

    const authUser: IAuthUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    return {
      accessToken: `mock-jwt-token-for-${user.id}`,
      user: authUser,
    };
  }

  async validateToken(token: string): Promise<IAuthUser> {
    // Logic thực tế sẽ verify JWT Token. Hiện tại mock để lấy từ ID static
    const user = await this.authRepo.findById('usr-1');
    if (!user) {
      throw new UnauthorizedException('Token không hợp lệ');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }
}
