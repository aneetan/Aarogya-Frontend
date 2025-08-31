export interface ChatResponse {
  response: string;
  sources?: Array<{
    intent: string;
    similarity: number;
    source: string;
  }>;
}

export interface ChatRequest {
  message: string;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}