export interface SystemConfigResponse {
  ai: {
    provider: 'OPENAI' | 'GEMINI' | 'ANTHROPIC';
    model: string;
    temperature: number;
    maxTokens: number;
  };
  telesale: {
    maxLeadsPerAgent: number;
    followUpReminderDays: number;
    autoAssignLeads: boolean;
  };
  leads: {
    duplicateCheckField: 'PHONE' | 'EMAIL';
    autoExpireDays: number;
  };
}

export interface UpdateSystemConfigPayload extends Partial<SystemConfigResponse> {}
