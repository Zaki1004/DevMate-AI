export interface Message {
  message: string;
  isUser: boolean;
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