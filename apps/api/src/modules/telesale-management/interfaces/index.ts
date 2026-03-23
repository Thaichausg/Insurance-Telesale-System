export interface ILead {
  id: string;
  name: string;
  phone: string;
  status: string;
  assignedTo?: string;
  notes?: string;
  lastCallDuration?: number;
  followUpDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAgentStats {
  agentId: string;
  leadsAssigned: number;
  leadsSuccess: number;
  conversionRate: number;
}
