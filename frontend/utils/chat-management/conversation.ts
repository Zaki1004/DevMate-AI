import { Conversation } from "@/types/conversation";
import { generateId } from "./uuid";

export const createConversation =
  (): Conversation => ({
    id: generateId(),
    title: "New Chat",
    messages: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });


export const updateConversationTimestamp = (
  conversation: Conversation
): Conversation => ({
  ...conversation,
  updatedAt: new Date().toISOString(),
});

export const renameConversation = (
  conversation: Conversation,
  title: string,
): Conversation => ({
  ...conversation,
  title,
  updatedAt: new Date().toISOString(),
});

export const deleteConversation = (
  conversations: Conversation[],
  conversationId: string,
): Conversation[] =>
  conversations.filter(
    (conversation) => conversation.id !== conversationId,
  );