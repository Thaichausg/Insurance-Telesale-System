import { Injectable } from '@nestjs/common';
import { LeadEntity } from '../entities/lead.entity';
import { QueryLeadDto } from '../dto/query-lead.dto';

@Injectable()
export class LeadsRepository {
  private leads: LeadEntity[] = [
    {
      id: 'LD001', name: 'Nguyễn Trần Phúc', phone: '0901111222', status: 'NEW', source: 'FACEBOOK', createdAt: new Date('2026-03-20T08:00:00Z'), updatedAt: new Date(), notes: '', assignedToId: ''
    },
    {
      id: 'LD002', name: 'Lê Hoàng Đạo', phone: '0988777666', status: 'ASSIGNED', source: 'GOOGLE', assignedToId: 'usr-3', createdAt: new Date('2026-03-21T09:15:00Z'), updatedAt: new Date(), notes: ''
    },
    // Mock 2 lead trong API DB để đảm bảo luồng data
  ];

  async findAll(query: QueryLeadDto): Promise<LeadEntity[]> {
    return this.leads.filter(lead => {
      let match = true;
      if (query.name && !lead.name.toLowerCase().includes(query.name.toLowerCase())) match = false;
      if (query.phone && !lead.phone.includes(query.phone)) match = false;
      if (query.status && lead.status !== query.status) match = false;
      if (query.source && lead.source !== query.source) match = false;
      return match;
    });
  }

  async findById(id: string): Promise<LeadEntity | null> {
    return this.leads.find(l => l.id === id) || null;
  }

  async save(lead: LeadEntity): Promise<LeadEntity> {
    const idx = this.leads.findIndex(l => l.id === lead.id);
    if (idx > -1) {
      this.leads[idx] = lead;
    } else {
      this.leads.push(lead);
    }
    return lead;
  }
}
