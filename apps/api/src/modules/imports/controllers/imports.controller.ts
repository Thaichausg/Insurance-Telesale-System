import { Controller, Post, Body } from '@nestjs/common';
import { ImportsService } from '../services/imports.service';
import { ImportLeadsDto } from '../dto/import-leads.dto';

@Controller('imports')
export class ImportsController {
  constructor(private readonly service: ImportsService) {}

  @Post('leads')
  async uploadLeads(@Body() body: ImportLeadsDto) {
    return this.service.processMassImport(body);
  }
}
