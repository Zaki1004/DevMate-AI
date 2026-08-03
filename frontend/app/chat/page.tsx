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
import { Button } from "@/components/ui/button";
import { ArrowDown, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { fileToBase64 } from "@/utils/image/file-to-base64";

export default function ChatPage() {
  const {
    conversations,
    setConversations,
    activeConversationId,
    setActiveConversationId,
  } = useConversation();

  const [streaming, setStreaming] = useState(false);
  const [autoSmartScroll, setAutoSmartScroll] = useState(true);
  const [showScrollToButton, setShowScrollToButton] = useState(false);
  const [collapsedSidebar, setCollapsedSidebar] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const lastUserMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      const mobile = width < 768;
      const tablet = width >= 768 && width < 1024;

      setIsMobile(mobile);
      setIsTablet(tablet);

      // Mobile
      if (mobile) {
        setSidebarOpen(false);
        setCollapsedSidebar(false);
        return;
      }

      // Tablet
      if (tablet) {
        setSidebarOpen(true);
        setCollapsedSidebar(true);
        return;
      }

      // Desktop
      setSidebarOpen(true);
      setCollapsedSidebar(false);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

    const nearBottom = distance < 300;
    setAutoSmartScroll(nearBottom);
    setShowScrollToButton(!nearBottom);
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

    let attachment;

    if (image) {
      attachment = {
        name: image.name,
        preview: await fileToBase64(image),
      };
    }

    const userMessage: Message = {
      id: generateId(),
      message,
      isUser: true,
      sourceCode,
      createdAt: new Date().toISOString(),
      codeName: sourceCode?.trim() ? "Code Snippet" : undefined,
      attachment,
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

    if (isMobile) {
      setSidebarOpen(false);
    }

    requestAnimationFrame(() => {
      chatContainerRef.current?.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  };

  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
    if (isMobile) {
      setSidebarOpen(false);
    }
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
    <div className="flex h-screen overflow-hidden bg-[#fafafa]">
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Sidebar */}
      <ConversationSidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelect={handleSelectConversation}
        onCreate={handleCreateConversation}
        onRename={handleRenameConversation}
        onDelete={handleDeleteConversation}
        collapsed={collapsedSidebar}
        onToggleCollapse={() => setCollapsedSidebar((prev) => !prev)}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isMobile={isMobile}
        isTablet={isTablet}
      />

      {isMobile && !sidebarOpen && (
        <header className="flex h-14 items-center px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </Button>
        </header>
      )}

      {/* Chat Area */}
      <main
        className={cn(
          "flex flex-1 flex-col overflow-hidden transition-transform duration-300",
          isMobile && sidebarOpen && "hidden",
          // (!isMobile || !sidebarOpen) && "flex",
        )}
      >
        {messages.length === 0 ? (
          <>
            <div className="flex flex-1 flex-col overflow-hidden">
              <div className="flex flex-1 items-center justify-center px-6">
                <EmptyState />
              </div>

              <ChatInput onSend={handleSend} />
            </div>
          </>
        ) : (
          <>
            <div
              ref={chatContainerRef}
              onScroll={handleScroll}
              className={`flex-1 ${
                messages.length === 0 ? "overflow-hidden" : "overflow-y-auto"
              }`}
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
                        codeName={chat.codeName}
                        sourceCode={chat.sourceCode}
                        onCopy={async () => {
                          await navigator.clipboard.writeText(chat.message);
                        }}
                      />
                    </div>
                  );
                })}

                {streaming && <div className="h-[450px]" />}

                <div ref={bottomRef} />
              </div>
            </div>

            <ChatInput onSend={handleSend} />

            {showScrollToButton && (
              <div className="fixed bottom-32 left-1/2 z-40 w-full max-w-4xl -translate-x-1/2 px-4">
                <div className="flex justify-center">
                  <Button
                    size="icon"
                    className="rounded-full shadow-lg cursor-pointer"
                    onClick={() => scrollToBottom()}
                  >
                    <ArrowDown size={18} />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
