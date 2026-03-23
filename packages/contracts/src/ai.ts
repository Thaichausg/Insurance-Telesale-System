export interface ReplyTemplate {
  id: string;
  title: string;
  content: string;
  keywords: string[];
  category: string;
  suggestedActions?: string[];
}

export interface AiSuggestionPayload {
  customerMessage: string;
  context?: string;
  provider?: string;
  model?: string;
}

export interface AiSuggestionResponse {
  replyText: string;
  suggestedActions?: string[];
  confidence?: number;
  tokensUsed?: number;
}
