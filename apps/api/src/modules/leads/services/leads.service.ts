import { Injectable, NotFoundException } from '@nestjs/common';
import { LeadsRepository } from '../repositories/leads.repository';
import { CreateLeadDto } from '../dto/create-lead.dto';
import { UpdateLeadDto } from '../dto/update-lead.dto';
import { QueryLeadDto } from '../dto/query-lead.dto';
import { LeadEntity } from '../entities/lead.entity';

@Injectable()
export class LeadsService {
  constructor(private readonly leadsRepo: LeadsRepository) {}

  async createLead(dto: CreateLeadDto): Promise<LeadEntity> {
    const newLead = new LeadEntity();
    newLead.id = `LD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    newLead.customerName = dto.customerName;
    newLead.phoneNumber = dto.phoneNumber;
    newLead.email = dto.email;
    newLead.source = dto.source;
    newLead.status = dto.status || 'NEW';
    newLead.groupTag = dto.groupTag;
    newLead.interestProduct = dto.interestProduct;
    newLead.note = dto.note;
    newLead.createdAt = new Date();
    newLead.updatedAt = new Date();

    return this.leadsRepo.save(newLead);
  }

  async getLeads(query: QueryLeadDto): Promise<LeadEntity[]> {
    return this.leadsRepo.findAll(query);
  }

  async getLeadById(id: string): Promise<LeadEntity> {
    const lead = await this.leadsRepo.findById(id);
    if (!lead) throw new NotFoundException('Lead không tồn tại');
    return lead;
  }

  async updateLeadStatus(id: string, dto: UpdateLeadDto): Promise<LeadEntity> {
    const lead = await this.getLeadById(id);
    
    if (dto.status) lead.status = dto.status;
    if (dto.note) lead.note = dto.note;
    if (dto.assignedToId) lead.assignedToId = dto.assignedToId;
    
    lead.updatedAt = new Date();

    return this.leadsRepo.save(lead);
  }
}
