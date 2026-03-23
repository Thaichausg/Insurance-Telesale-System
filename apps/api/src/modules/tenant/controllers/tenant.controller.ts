import { Controller, Get, Post, Put, Patch, Body, Param } from '@nestjs/common';
import { TenantService } from '../services/tenant.service';
import { CreateTenantDto } from '../dto/create-tenant.dto';
import { UpdateTenantDto } from '../dto/update-tenant.dto';

@Controller('tenants')
export class TenantController {
  constructor(private readonly service: TenantService) {}

  @Get()
  async findAll() {
    return this.service.getAllTenants();
  }

  @Post()
  async create(@Body() dto: CreateTenantDto) {
    return this.service.createTenant(dto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTenantDto) {
    return this.service.updateTenant(id, dto);
  }

  @Patch(':id/toggle')
  async toggle(@Param('id') id: string) {
    return this.service.toggleStatus(id);
  }
}
