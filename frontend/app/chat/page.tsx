"use client";

import { useState, useEffect, useRef } from "react";

import ChatBubble from "@/components/chat/chat-bubble";
import ChatInput from "@/components/chat/chat-input";
import EmptyState from "@/components/chat/empty-state";
import { sendMessage } from "@/services/chat-service";
import { Message } from "@/types/chat";

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
    <main className="flex h-screen flex-col">
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="mx-auto flex max-w-4xl flex-col gap-4 p-6">
            {messages.map((chat, index) => (
              <ChatBubble
                key={index}
                message={chat.message}
                isUser={chat.isUser}
                attachment={chat.attachment}
              />
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-xl bg-gray-100 px-5 py-4">
                  DevMate sedang berpikir...
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <ChatInput onSend={handleSend} />
      <div ref={bottomRef} />
    </main>
  );
}
