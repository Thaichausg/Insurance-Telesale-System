import { AiProvider, DistributionStrategy } from '../types';

export const AI_PROVIDERS: AiProvider[] = ['OPENAI', 'GEMINI', 'CLAUDE'];
export const DISTRIBUTION_STRATEGIES: DistributionStrategy[] = ['ROUND_ROBIN', 'KPI_BASED', 'MANUAL'];

export const CONFIG_KEYS = {
  AI: 'system_config_ai',
  DISTRIBUTION: 'system_config_distribution',
  FOLLOW_UP: 'system_config_followup',
};
