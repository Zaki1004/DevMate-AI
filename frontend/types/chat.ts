export interface Message {
  message: string;
  isUser: boolean;
  attachment?: Attachment;
}

export interface Attachment {
  name: string;
  preview: string;
}
