import { Controller, Get, Post, Put, Patch, Body, Query, Param } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { QueryUserDto } from '../dto/query-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getList(@Query() query: QueryUserDto) {
    return this.usersService.listUsers(query);
  }

  @Post()
  async create(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.updateUser(id, body);
  }

  @Patch(':id/status')
  async toggleStatus(@Param('id') id: string, @Body('isActive') isActive: boolean) {
    return this.usersService.toggleStatus(id, isActive);
  }
}
