"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import ConversationMenu from "./conversation-menu";

import { Conversation } from "@/types/conversation";
import { Input } from "../ui/input";

type ConversationItemProps = {
  conversation: Conversation;
  isActive: boolean;
  onSelect: () => void;
  onRename: (title: string) => void;
  onDelete: () => void;
};

const ConversationItem = ({
  conversation,
  isActive,
  onSelect,
  onRename,
  onDelete,
}: ConversationItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(conversation.title);
  const inputRef = useRef<HTMLInputElement>(null);

  // SINGKRONISASI JUDUL BISA BERUBAH DI SIDEBAR

  useEffect(() => {
    setTitle(conversation.title);
  }, [conversation.title]);

  // AUTO FOCUS KETIKA JUDUL BERUBAH DI SIDEBAR

  useEffect(() => {
    if (!isEditing) return;

    inputRef.current?.focus();

    inputRef.current?.select();
  }, [isEditing]);

  // HANDLE SAVE RENAME

  const handleSave = () => {
    const newTitle = title.trim();

    if (!newTitle) {
      setTitle(conversation.title);
      setIsEditing(false);
      return;
    }

    onRename(newTitle);

    setIsEditing(false);
  };

  // HANDLE CANCEL RENAME

  const handleCancel = () => {
    setTitle(conversation.title);

    setIsEditing(false);
  };

  return (
    <div
      className={`
                flex items-center justify-between rounded-lg
                px-3 py-2 transition-colors
                ${isActive ? "bg-muted" : "hover:bg-muted/50"}
            `}
    >
      <Button
        onClick={onSelect}
        className="flex h-auto flex-1 flex-col items-start gap-1 px-3 py-2 text-left"
      >
        {isEditing ? (
          <Input
            ref={inputRef}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            onBlur={handleSave}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSave();
              }

              if (event.key === "Escape") {
                handleCancel();
              }
            }}
            className="w-full rounded-md border bg-background px-2 text-black py-1 text-sm outline-none ring-0 focus:border-primary"
          />
        ) : (
          <p className="truncate text-sm font-medium">{conversation.title}</p>
        )}

        <p className="text-xs text-muted-foreground">
          {conversation.messages.length} messages
        </p>
      </Button>

      <ConversationMenu
        onRename={() => setIsEditing(true)}
        onDelete={onDelete}
      />
    </div>
  );
};

export default ConversationItem;
