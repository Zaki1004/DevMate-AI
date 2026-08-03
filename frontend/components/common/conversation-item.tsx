"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import ConversationMenu from "./conversation-menu";

import { Conversation } from "@/types/conversation";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { MessageSquare } from "lucide-react";

type ConversationItemProps = {
  conversation: Conversation;
  isActive: boolean;
  onSelect: () => void;
  onRename: (title: string) => void;
  onDelete: () => void;
  collapsed?: boolean;
};

const ConversationItem = ({
  conversation,
  isActive,
  onSelect,
  onRename,
  onDelete,
  collapsed = false,
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
      className={cn(
        "flex rounded-xl transition-all duration-200",
        collapsed
          ? "justify-center py-2"
          : "items-center justify-between px-3 py-2",

        isActive
          ? "bg-blue-200 ring-1 ring-zinc-200 shadow-sm"
          : "hover:bg-blue-50",
      )}
    >
      <Button
        onClick={onSelect}
        className={cn(
          "flex h-auto flex-1 rounded-xl transition-all duration-200",
          collapsed
            ? "justify-center p-0"
            : "flex-col items-start gap-1 px-3 py-2 text-left",
        )}
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
            className="w-full min-w-0 rounded-md border bg-background px-2 py-1 text-sm text-black outline-none ring-0 focus:border-primary"
          />
        ) : (
          <>
            {collapsed ? (
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold transition-colors",
                  isActive
                    ? "bg-zinc-900 text-white shadow-sm"
                    : "bg-zinc-100 text-zinc-700 transition-all duration-200 hover:bg-zinc-200",
                )}
              >
                {conversation.title.charAt(0).toUpperCase()}
              </div>
            ) : (
              <div className="w-full min-w-0">
                <p
                  className={cn(
                    "truncate text-sm transition-colors duration-300 ease-in-out",
                    isActive ? "font-bold text-white text-md" : "text-white",
                  )}
                >
                  {conversation.title}
                </p>
              </div>
            )}
          </>
        )}

        {!collapsed && (
          <p className="text-xs text-zinc-500">
            {conversation.messages.length} messages
          </p>
        )}
      </Button>

      {!collapsed && (
        <div className="shrink-0">
          <ConversationMenu
            onRename={() => setIsEditing(true)}
            onDelete={onDelete}
          />
        </div>
      )}
    </div>
  );
};

export default ConversationItem;
