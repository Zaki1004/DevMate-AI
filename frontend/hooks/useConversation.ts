import { useState } from "react";

import { Conversation } from "@/types/conversation";

export const useConversation = () => {
  const [conversations, setConversations] =
    useState<Conversation[]>([]);

  const [activeConversationId, setActiveConversationId] =
    useState<string | null>(null);

  return {
    conversations,
    setConversations,

    activeConversationId,
    setActiveConversationId,
  };
};