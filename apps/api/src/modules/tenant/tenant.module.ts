import { Module } from '@nestjs/common';
import { TenantController } from './controllers/tenant.controller';
import { TenantService } from './services/tenant.service';
import { TenantRepository } from './repositories/tenant.repository';

@Module({
  controllers: [TenantController],
  providers: [TenantService, TenantRepository],
  exports: [TenantService],
})
export class TenantModule {}
