import { Module } from '@nestjs/common';
import { ImportsController } from './controllers/imports.controller';
import { ImportsService } from './services/imports.service';
import { ImportsRepository } from './repositories/imports.repository';

@Module({
  controllers: [ImportsController],
  providers: [
    ImportsService,
    ImportsRepository,
  ],
  exports: [ImportsService],
})
export class ImportsModule {}
