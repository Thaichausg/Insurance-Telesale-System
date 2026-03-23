import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/auth.entity';

@Injectable()
export class AuthRepository {
  private users: UserEntity[] = [
    {
      id: 'usr-1',
      email: 'admin@antigravity.com',
      passwordHash: 'hashed-password-123456',
      name: 'Super Admin',
      role: 'SUPER_ADMIN',
      isActive: true,
      createdAt: new Date(),
    }
  ];

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.users.find(u => u.email === email) || null;
  }

  async findById(id: string): Promise<UserEntity | null> {
    return this.users.find(u => u.id === id) || null;
  }

  async create(user: UserEntity): Promise<UserEntity> {
    this.users.push(user);
    return user;
  }
}
