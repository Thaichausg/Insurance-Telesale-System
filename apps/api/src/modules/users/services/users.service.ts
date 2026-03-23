import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { QueryUserDto } from '../dto/query-user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UsersRepository) {}

  async listUsers(query: QueryUserDto) {
    const isActive = query.isActive !== undefined ? query.isActive === 'true' : undefined;
    return this.userRepo.findAll(query.role, query.search, isActive);
  }

  async createUser(dto: CreateUserDto) {
    const newUser: UserEntity = {
      id: `usr-${Date.now()}`,
      name: dto.name,
      email: dto.email,
      role: dto.role,
      parentId: dto.parentId || null,
      isActive: true,
      passwordHash: 'hashed_pw', // Mock
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return this.userRepo.create(newUser);
  }

  async updateUser(id: string, dto: UpdateUserDto) {
    return this.userRepo.update(id, dto);
  }

  async toggleStatus(id: string, isActive: boolean) {
    return this.userRepo.update(id, { isActive });
  }
}
