export interface ISystemConfigResult {
  ai: {
    provider: string;
    model: string;
    apiKey: string;
  };
  distribution: {
    strategy: string;
    batchSize: number;
  };
  followUp: {
    defaultDays: number;
    maxRetries: number;
  };
}
