import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersRepository {
  private users: UserEntity[] = [
    { id: 'usr-1', name: 'Giám Đốc Quang', email: 'quang@congty.com', role: 'SUPER_ADMIN', isActive: true, parentId: null, passwordHash: 'hash', createdAt: new Date(), updatedAt: new Date() },
    { id: 'usr-2', name: 'Quản Lý Hà', email: 'ha@congty.com', role: 'MANAGER', isActive: true, parentId: 'usr-1', passwordHash: 'hash', createdAt: new Date(), updatedAt: new Date() }
  ];

  async findAll(role?: string, search?: string, isActive?: boolean): Promise<UserEntity[]> {
    return this.users.filter(u => {
      if (role && u.role !== role) return false;
      if (search && !u.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (isActive !== undefined && u.isActive !== isActive) return false;
      return true;
    });
  }

  async create(user: UserEntity): Promise<UserEntity> {
    this.users.push(user);
    return user;
  }

  async update(id: string, updates: Partial<UserEntity>): Promise<UserEntity> {
    const idx = this.users.findIndex(u => u.id === id);
    if (idx === -1) throw new NotFoundException('User not found');
    this.users[idx] = { ...this.users[idx], ...updates, updatedAt: new Date() };
    return this.users[idx];
  }
}
