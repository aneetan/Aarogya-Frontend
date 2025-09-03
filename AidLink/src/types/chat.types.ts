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

export interface MessageProps {
  text: string | MedicalResponse;
  isUser: boolean;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isFirstAidStep?: boolean;
}

export interface ChatHistoryProps {
  id: string;
  title: string;
  timestamp: Date;
  preview: string;
}

export interface SuggestedQuestion {
  id: string;
  text: string;
  category: string;
}

export interface MedicalResponse {
  title: string;
  overview?: string;
  warnings: string[];
  steps: StepProps[];
  additionalNotes?: string[];
  emergencyAction?: string;
}

export interface StepProps{
   step_number: number;
   instruction: string;
   details: string;
}