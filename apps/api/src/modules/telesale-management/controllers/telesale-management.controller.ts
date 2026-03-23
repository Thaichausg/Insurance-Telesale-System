import { Controller, Post, Body, Param, Put, Get, UseGuards, Request, Patch } from '@nestjs/common';
import { TelesaleManagementService } from '../services/telesale-management.service';
import { AssignLeadDto } from '../dto/assign-lead.dto';
import { UpdateLeadStatusDto } from '../dto/update-lead-status.dto';

@Controller('telesale-management')
export class TelesaleManagementController {
  constructor(private readonly telesaleService: TelesaleManagementService) {}

  @Get('assigned')
  async getAssignedLeads(@Request() req: any) {
    // Trong thực tế sẽ lấy agentId từ JWT token (req.user.id)
    const agentId = req.user?.id || 'TEST-AGENT-001';
    return this.telesaleService.getAssignedLeads(agentId);
  }

  @Post('assign')
  async assignLeads(@Body() dto: AssignLeadDto) {
    return this.telesaleService.assignLeads(dto.leadIds, dto.agentIds);
  }

  @Patch('leads/:id/status')
  async updateStatus(@Param('id') id: string, @Body() dto: UpdateLeadStatusDto) {
    return this.telesaleService.updateLeadStatus(id, dto);
  }

  @Get('leads/:id/ai-suggestion')
  async getAiSuggestion(@Param('id') id: string) {
    return this.telesaleService.getAiSuggestion(id);
  }
}
