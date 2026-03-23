import { TelesaleAgent, Lead } from '../types';

/**
 * Phân bổ lead đều đặn theo thuật toán Round Robin
 */
export const assignLeadsRoundRobin = (leads: Lead[], agents: TelesaleAgent[]): Lead[] => {
  const activeAgents = agents.filter(a => a.status === 'active');
  if (activeAgents.length === 0) return leads;
  
  let agentIndex = 0;
  return leads.map(lead => {
    if (lead.assignedTo) return lead; // Bỏ qua nếu đã được phân bổ
    const assignedAgent = activeAgents[agentIndex];
    agentIndex = (agentIndex + 1) % activeAgents.length;
    return { ...lead, assignedTo: assignedAgent.id, status: 'calling' };
  });
};
