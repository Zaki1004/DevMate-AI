import { Message } from "./chat";

export interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
  isAutoTitle: boolean;
  isManuallyRenamed: boolean;
}