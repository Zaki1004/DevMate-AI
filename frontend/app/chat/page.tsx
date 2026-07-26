"use client";

import { useState, useEffect, useRef } from "react";

import ChatBubble from "@/components/chat/chat-bubble";
import ChatInput from "@/components/chat/chat-input";
import EmptyState from "@/components/chat/empty-state";
import { streamMessage } from "@/services/chat-service";
import { Message } from "@/types/chat";
import Loading from "@/components/common/loading";

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [autoSmartScroll, setAutoSmartScroll] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const lastUserMessageRef = useRef<HTMLDivElement>(null);
  const [streaming, setStreaming] = useState(false);

  const handleScroll = () => {
    if (!chatContainerRef.current) return;

    const container = chatContainerRef.current;

    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;

    setAutoSmartScroll(distanceFromBottom < 300);
  };

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    bottomRef.current?.scrollIntoView({
      behavior,
      block: "end",
    });
  };

  const focusLatestConversation = () => {
    if (!chatContainerRef.current || !lastUserMessageRef.current) {
      return;
    }

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

  const handleSend = async (
    message: string,
    image?: File,
    sourceCode?: string,
  ) => {
    const userMessage: Message = {
      message,
      isUser: true,
      sourceCode,
      attachment: image
        ? {
            name: image.name,
            preview: URL.createObjectURL(image),
          }
        : undefined,
    };

    setStreaming(true);

    /**
     * Tambahkan user + bubble AI kosong
     */
    setMessages((prev) => [
      ...prev,
      userMessage,
      {
        message: "",
        isUser: false,
        streaming: true,
      },
    ]);

    setAutoSmartScroll(true);

    requestAnimationFrame(() => {
      focusLatestConversation();
    });

    try {
      await streamMessage(message, sourceCode, image, (chunk) => {
        setMessages((prev) => {
          const updated = [...prev];

          const lastIndex = updated.length - 1;

          updated[lastIndex] = {
            ...updated[lastIndex],
            message: updated[lastIndex].message + chunk,
            streaming: true,
          };

          return updated;
        });

        if (autoSmartScroll) {
          requestAnimationFrame(() => {
            scrollToBottom("auto");
          });
        }
      });

      setMessages((prev) => {
        const updated = [...prev];

        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          streaming: false,
        };

        return updated;
      });
    } catch (error) {
      console.error(error);

      setMessages((prev) => {
        const updated = [...prev];

        updated[updated.length - 1] = {
          message: "Terjadi kesalahan.",
          isUser: false,
          streaming: false,
        };

        return updated;
      });
    } finally {
      setStreaming(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-[#fafafa]">
      {messages.length === 0 ? (
        <div className="flex flex-1 items-center justify-center px-6">
          <EmptyState />
        </div>
      ) : (
        <div
          ref={chatContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto"
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-48">
            {messages.map((chat, index) => {
              const isLastUserMessage =
                chat.isUser &&
                index === messages.map((m) => m.isUser).lastIndexOf(true);

              return (
                <div
                  key={index}
                  ref={isLastUserMessage ? lastUserMessageRef : null}
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
      )}

      <ChatInput onSend={handleSend} />
    </div>
  );
}
