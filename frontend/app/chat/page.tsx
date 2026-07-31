"use client";

import { useEffect, useRef, useState } from "react";

import ChatBubble from "@/components/chat/chat-bubble";
import ChatInput from "@/components/chat/chat-input";
import EmptyState from "@/components/chat/empty-state";

import { streamMessage } from "@/services/chat-service";

import { Message } from "@/types/chat";

import { useConversation } from "@/hooks/useConversation";
import {
  createConversation,
  deleteConversation,
  renameConversation,
  updateConversationTimestamp,
} from "@/utils/chat-management/conversation";
import { generateId } from "@/utils/chat-management/uuid";
import ConversationSidebar from "@/components/common/sidebar";
import {
  loadActiveConversation,
  loadConversations,
  saveActiveConversation,
  saveConversations,
} from "@/utils/chat-management/conversation-storage";
import Swal from "sweetalert2";
import { generateConversationTitle } from "@/utils/chat-management/auto-title-generator";

export default function ChatPage() {
  const {
    conversations,
    setConversations,
    activeConversationId,
    setActiveConversationId,
  } = useConversation();

  const [streaming, setStreaming] = useState(false);
  const [autoSmartScroll, setAutoSmartScroll] = useState(true);

  const bottomRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const lastUserMessageRef = useRef<HTMLDivElement>(null);

  /**
   * =====================================================
   * Create First Conversation + Restore Conversation
   * =====================================================
   */

  useEffect(() => {
    const storedConversations = loadConversations();

    if (storedConversations.length > 0) {
      setConversations(storedConversations);

      const activeId = loadActiveConversation();

      if (
        activeId &&
        storedConversations.some((conversation) => conversation.id === activeId)
      ) {
        setActiveConversationId(activeId);
      } else {
        setActiveConversationId(storedConversations[0].id);
      }

      return;
    }

    const conversation = createConversation();

    setConversations([conversation]);

    setActiveConversationId(conversation.id);
  }, []);

  /**
   * =====================================================
   * Active Conversation
   * =====================================================
   */

  const activeConversation =
    conversations.find(
      (conversation) => conversation.id === activeConversationId,
    ) ?? null;

  const messages = activeConversation?.messages ?? [];

  /**
   * =====================================================
   * Smart Scroll
   * =====================================================
   */

  const handleScroll = () => {
    if (!chatContainerRef.current) return;

    const container = chatContainerRef.current;

    const distance =
      container.scrollHeight - container.scrollTop - container.clientHeight;

    setAutoSmartScroll(distance < 300);
  };

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    bottomRef.current?.scrollIntoView({
      behavior,
      block: "end",
    });
  };

  const focusLatestConversation = () => {
    if (!chatContainerRef.current || !lastUserMessageRef.current) return;

    const container = chatContainerRef.current;

    const target =
      lastUserMessageRef.current.offsetTop - container.clientHeight / 2;

    container.scrollTo({
      top: Math.max(target, 0),
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (!autoSmartScroll) return;

    scrollToBottom("smooth");
  }, [messages, autoSmartScroll]);

  /**
   * =====================================================
   * Send Message
   * =====================================================
   */

  const handleSend = async (
    message: string,
    image?: File,
    sourceCode?: string,
  ) => {
    if (!activeConversation) return;

    const userMessage: Message = {
      id: generateId(),
      message,
      isUser: true,
      sourceCode,
      createdAt: new Date().toISOString(),
      attachment: image
        ? {
            name: image.name,
            preview: URL.createObjectURL(image),
          }
        : undefined,
    };

    const aiMessage: Message = {
      id: generateId(),
      message: "",
      isUser: false,
      streaming: true,
      createdAt: new Date().toISOString(),
    };

    setStreaming(true);
    setAutoSmartScroll(true);

    /**
     * Add User + AI Bubble
     */

    setConversations((prev) =>
      prev.map((conversation) => {
        if (conversation.id !== activeConversationId) return conversation;

        return updateConversationTimestamp({
          ...conversation,
          // updatedAt: new Date().toISOString(),
          messages: [...conversation.messages, userMessage, aiMessage],
        });
      }),
    );

    requestAnimationFrame(() => {
      focusLatestConversation();
    });

    try {
      await streamMessage(message, sourceCode, image, (chunk) => {
        setConversations((prev) =>
          prev.map((conversation) => {
            if (conversation.id !== activeConversationId) return conversation;

            const updatedMessages = [...conversation.messages];

            const lastIndex = updatedMessages.length - 1;

            updatedMessages[lastIndex] = {
              ...updatedMessages[lastIndex],
              message: updatedMessages[lastIndex].message + chunk,
              streaming: true,
            };

            return updateConversationTimestamp({
              ...conversation,
              // updatedAt: new Date().toISOString(),
              messages: updatedMessages,
            });
          }),
        );

        if (autoSmartScroll) {
          requestAnimationFrame(() => {
            scrollToBottom("auto");
          });
        }
      });

      // MULAI STREMING CHAT MESSAGE

      setConversations((prev) =>
        prev.map((conversation) => {
          if (conversation.id !== activeConversationId) return conversation;

          const updatedMessages = [...conversation.messages];

          updatedMessages[updatedMessages.length - 1] = {
            ...updatedMessages[updatedMessages.length - 1],
            streaming: false,
          };

          return updateConversationTimestamp({
            ...conversation,
            // updatedAt: new Date().toISOString(),
            messages: updatedMessages,
          });
        }),
      );

      // AUTO TITLE GENERATION KETIKA STREAMING MESSAGE SUDAH SELESAI

      setConversations((previous) =>
        previous.map((conversation) => {
          if (conversation.id !== activeConversationId) {
            return conversation;
          }

          if (!conversation.isAutoTitle) {
            return conversation;
          }

          return {
            ...conversation,
            title: generateConversationTitle(message),
            isAutoTitle: false,
          };
        }),
      );
    } catch (error) {
      console.error(error);

      setConversations((prev) =>
        prev.map((conversation) => {
          if (conversation.id !== activeConversationId) return conversation;

          const updatedMessages = [...conversation.messages];

          updatedMessages[updatedMessages.length - 1] = {
            id: generateId(),
            message: "Terjadi kesalahan.",
            isUser: false,
            createdAt: new Date().toISOString(),
            streaming: false,
          };

          return updateConversationTimestamp({
            ...conversation,
            // updatedAt: new Date().toISOString(),
            messages: updatedMessages,
          });
        }),
      );
    } finally {
      setStreaming(false);
    }
  };

  /**
   * =====================================================
   * Conversation Persistence (Isi Chat dari User)
   * =====================================================
   */

  useEffect(() => {
    if (conversations.length === 0) {
      return;
    }

    saveConversations(conversations);
  }, [conversations]);

  // AUTO SAVE CONVERSATION (Ketika user membuat new chat)

  useEffect(() => {
    if (!activeConversationId) {
      return;
    }

    saveActiveConversation(activeConversationId);
  }, [activeConversationId]);

  // EDGE CASES

  useEffect(() => {
    if (conversations.length === 0) {
      return;
    }

    if (
      activeConversationId &&
      conversations.some(
        (conversation) => conversation.id === activeConversationId,
      )
    ) {
      return;
    }

    setActiveConversationId(conversations[0].id);
  }, [conversations, activeConversationId]);

  // Chat Management & Conversation Selection

  const handleCreateConversation = () => {
    const latestConversation = conversations[0];

    if (latestConversation && latestConversation.messages.length === 0) {
      setActiveConversationId(latestConversation.id);
      return;
    }

    const conversation = createConversation();

    setConversations((prev) => [conversation, ...prev]);

    setActiveConversationId(conversation.id);

    requestAnimationFrame(() => {
      chatContainerRef.current?.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  };

  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
  };

  // RENAME CONVERSATION

  const handleRenameConversation = (conversationId: string, title: string) => {
    setConversations((previous) =>
      previous.map((conversation) =>
        conversation.id === conversationId
          ? renameConversation(conversation, title)
          : conversation,
      ),
    );
  };

  // DELETE CONVERSATION

  const handleDeleteConversation = async (conversationId: string) => {
    const conversation = conversations.find(
      (item) => item.id === conversationId,
    );

    if (!conversation) {
      return;
    }

    const result = await Swal.fire({
      title: "Delete Conversation?",
      text: `"${conversation.title}" will be permanently deleted.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
    });

    if (!result.isConfirmed) {
      return;
    }

    const updatedConversations = deleteConversation(
      conversations,
      conversationId,
    );

    /**
     * Tidak boleh kosong
     */
    if (updatedConversations.length === 0) {
      const newConversation = createConversation();

      setConversations([newConversation]);

      setActiveConversationId(newConversation.id);

      return;
    }

    /**
     * Hapus conversation
     */
    setConversations(updatedConversations);

    /**
     * Jika bukan conversation aktif
     */
    if (conversationId !== activeConversationId) {
      return;
    }

    /**
     * Pilih conversation pertama
     */
    setActiveConversationId(updatedConversations[0].id);
  };

  /**
   * =====================================================
   * Render
   * =====================================================
   */

  return (
    <div className="flex h-full overflow-hidden bg-[#fafafa]">
      {/* Sidebar */}
      <ConversationSidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelect={handleSelectConversation}
        onCreate={handleCreateConversation}
        onRename={handleRenameConversation}
        onDelete={handleDeleteConversation}
      />

      {/* Chat Area */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {messages.length === 0 ? (
          <>
            <div className="flex flex-1 items-center justify-center px-6">
              <EmptyState />
            </div>

            <ChatInput onSend={handleSend} />
          </>
        ) : (
          <>
            <div
              ref={chatContainerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto"
            >
              <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-6 pb-48 sm:px-6 sm:py-8 lg:px-8">
                {messages.map((chat, index) => {
                  const isLastUser =
                    chat.isUser &&
                    index === messages.map((m) => m.isUser).lastIndexOf(true);

                  return (
                    <div
                      key={chat.id}
                      ref={isLastUser ? lastUserMessageRef : null}
                    >
                      <ChatBubble
                        message={chat.message}
                        isUser={chat.isUser}
                        attachment={chat.attachment}
                        streaming={chat.streaming}
                      />
                    </div>
                  );
                })}

                {streaming && <div className="h-[450px]" />}

                <div ref={bottomRef} />
              </div>
            </div>

            <ChatInput onSend={handleSend} />
          </>
        )}
      </main>
    </div>
  );
}
