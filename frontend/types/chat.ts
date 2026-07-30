export interface Message {
  id: string;
  createdAt: string;
  message: string;
  isUser: boolean;
  streaming?: boolean;
  sourceCode?: string;
  attachment?: Attachment;
}

export interface Attachment {
  name: string;
  preview: string;
}

export interface ChatRequest {
  message: string;
  sourceCode?: string;
}