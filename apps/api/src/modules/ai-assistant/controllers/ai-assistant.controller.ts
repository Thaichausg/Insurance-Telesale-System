import { Controller, Get, Post, Put, Patch, Body, Query, Param } from '@nestjs/common';
import { AiAssistantService } from '../services/ai-assistant.service';
import { CreateReplyTemplateDto } from '../dto/create-reply-template.dto';
import { UpdateReplyTemplateDto } from '../dto/update-reply-template.dto';
import { GenerateReplyDto } from '../dto/generate-reply.dto';

@Controller('ai-assistant')
export class AiAssistantController {
  constructor(private readonly service: AiAssistantService) {}

  @Get('templates')
  async getTemplates(@Query('search') search?: string) {
    return this.service.getTemplates(search);
  }

  @Post('templates')
  async createTemplate(@Body() body: CreateReplyTemplateDto) {
    return this.service.createTemplate(body);
  }

  @Put('templates/:id')
  async updateTemplate(@Param('id') id: string, @Body() body: UpdateReplyTemplateDto) {
    return this.service.updateTemplate(id, body);
  }

  @Post('generate')
  async generateReply(@Body() body: GenerateReplyDto) {
    return this.service.generateReply(body);
  }
}
