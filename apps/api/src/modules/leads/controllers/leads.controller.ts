import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { LeadsService } from '../services/leads.service';
import { CreateLeadDto } from '../dto/create-lead.dto';
import { UpdateLeadDto } from '../dto/update-lead.dto';
import { QueryLeadDto } from '../dto/query-lead.dto';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  async createLead(@Body() dto: CreateLeadDto) {
    return this.leadsService.createLead(dto);
  }

  @Get()
  async getLeads(@Query() query: QueryLeadDto) {
    return this.leadsService.getLeads(query);
  }

  @Get(':id')
  async getLeadById(@Param('id') id: string) {
    return this.leadsService.getLeadById(id);
  }

  @Put(':id/status')
  async updateStatus(@Param('id') id: string, @Body() dto: UpdateLeadDto) {
    return this.leadsService.updateLeadStatus(id, dto);
  }
}
