"use client";

import { useState, useEffect, useRef } from "react";

import ChatBubble from "@/components/chat/chat-bubble";
import ChatInput from "@/components/chat/chat-input";
import EmptyState from "@/components/chat/empty-state";
import { sendMessage } from "@/services/chat-service";
import { Message } from "@/types/chat";
import Loading from "@/components/common/loading";

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

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

    setMessages((prev) => [...prev, userMessage]);

    try {
      setLoading(true);

      const response = await sendMessage(message, sourceCode, image);

      const botMessage: Message = {
        message: response.answer,
        isUser: false,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          message: "Terjadi kesalahan.",
          isUser: false,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-[#fafafa]">
      {messages.length === 0 ? (
        <div className="flex flex-1 items-center justify-center px-6">
          <EmptyState />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-48">
            {messages.map((chat, index) => (
              <ChatBubble
                key={index}
                message={chat.message}
                isUser={chat.isUser}
                attachment={chat.attachment}
              />
            ))}

            {loading && (
              <div className="flex items-center gap-3">
                <Loading />
                <span>DevMate AI sedang berpikir...</span>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </div>
      )}

      <ChatInput onSend={handleSend} />
    </div>
  );
}
