import { Message } from "@/types/chat";
import { Conversation } from "@/types/conversation";

const STORAGE_VERSION = "v1";
const STORAGE_KEY = `devmate-conversations-${STORAGE_VERSION}`;
const ACTIVE_STORAGE_KEY = `devmate-active-conversation-${STORAGE_VERSION}`;

export const saveConversations = (conversations: Conversation[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
};

// VALIDASI MESSAGE

const isValidMessage = (value: unknown): value is Message => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const message = value as Message;

  return (
    typeof message.id === "string" &&
    typeof message.message === "string" &&
    typeof message.isUser === "boolean" &&
    typeof message.createdAt === "string"
  );
};

// VALIDASI CONVERSATION/PERCAKAPAN

const isValidConversation = (value: unknown): value is Conversation => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const conversation = value as Conversation;

  return (
    typeof conversation.id === "string" &&
    typeof conversation.title === "string" &&
    typeof conversation.createdAt === "string" &&
    typeof conversation.updatedAt === "string" &&
    Array.isArray(conversation.messages) &&
    conversation.messages.every(isValidMessage)
  );
};

export const loadConversations = (): Conversation[] => {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(data);

    if (!Array.isArray(parsed)) {
      clearConversationStorage();
      return [];
    }

    if (!parsed.every(isValidConversation)) {
      clearConversationStorage();
      return [];
    }

    return parsed;
  } catch {
    clearConversationStorage();
    return [];
  }
};

export const saveActiveConversation = (conversationId: string): void => {
  localStorage.setItem(ACTIVE_STORAGE_KEY, conversationId);
};

export const loadActiveConversation = (): string | null => {
  const value = localStorage.getItem(ACTIVE_STORAGE_KEY);

  if (!value || value.trim() === "") {
    return null;
  }

  return value;
};

export const clearConversationStorage = (): void => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(ACTIVE_STORAGE_KEY);
};
