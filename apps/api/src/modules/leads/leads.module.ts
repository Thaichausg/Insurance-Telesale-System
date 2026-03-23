import { Module } from '@nestjs/common';
import { LeadsController } from './controllers/leads.controller';
import { LeadsService } from './services/leads.service';
import { LeadsRepository } from './repositories/leads.repository';

@Module({
  controllers: [LeadsController],
  providers: [
    LeadsService,
    LeadsRepository,
  ],
  exports: [LeadsService],
})
export class LeadsModule {}
