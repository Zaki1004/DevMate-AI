import { Conversation } from "@/types/conversation";
import ConversationItem from "./conversation-item";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Menu, Plus } from "lucide-react";

type Props = {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelect: (id: string) => void;
  onCreate: () => void;
  onRename: (id: string, title: string) => void;
  onDelete: (id: string) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  sidebarOpen?: boolean;
  setSidebarOpen?: (open: boolean) => void;
  isMobile?: boolean;
  isTablet?: boolean;
};

const Sidebar = ({
  conversations,
  activeConversationId,
  onSelect,
  onCreate,
  onRename,
  onDelete,
  collapsed,
  onToggleCollapse,
  sidebarOpen,
  setSidebarOpen,
  isMobile,
  isTablet,
}: Props) => {
  const sortedConversations = [...conversations].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );

  return (
    <aside
      className={cn(
        "flex h-screen shrink-0 flex-col border-r bg-white transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ease-in-out",
        isMobile
          ? cn(
              "fixed inset-0 z-50 w-full",
              sidebarOpen ? "translate-x-0" : "-translate-x-full",
            )
          : cn(
              "relative flex h-screen shrink-0 flex-col",
              collapsed ? "w-20" : "w-72",
            ),
      )}
    >
      <div className="border-b p-3 ">
        {/* Collapse Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            if (isMobile) {
              setSidebarOpen?.(false);
            } else {
              onToggleCollapse?.();
            }
          }}
          className={cn(
            "mb-3",
            collapsed
              ? "mx-auto flex h-10 w-10 items-center justify-center"
              : "w-full justify-end transition-all duration-300",
          )}
        >
          <Menu size={20} />
        </Button>

        {/* New Chat */}
        <Button
          onClick={onCreate}
          className={cn(
            "w-full justify-center gap-2 rounded-xl",
            collapsed ? "px-0" : "justify-start px-4",
          )}
        >
          <Plus size={18} />

          {!collapsed && (
            <span
              className={cn(
                "overflow-hidden whitespace-nowrap transition-all duration-300",
                collapsed ? "w-0 opacity-0" : "ml-2 w-auto opacity-100",
              )}
            >
              New Chat
            </span>
          )}
        </Button>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto p-3">
        {sortedConversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            isActive={conversation.id === activeConversationId}
            onSelect={() => onSelect(conversation.id)}
            onRename={(title) => onRename(conversation.id, title)}
            onDelete={() => onDelete(conversation.id)}
            collapsed={collapsed}
          />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
