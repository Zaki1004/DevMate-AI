import { Conversation } from "@/types/conversation";
import ConversationItem from "./conversation-item";

type Props = {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelect: (id: string) => void;
  onCreate: () => void;
  onRename: (id: string, title: string) => void;
  onDelete: (id: string) => void;
};

const Sidebar = ({
  conversations,
  activeConversationId,
  onSelect,
  onCreate,
  onRename,
  onDelete,
}: Props) => {
  const sortedConversations = [...conversations].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );

  return (
    <aside className="flex w-72 flex-col border-r bg-white">
      <div className="border-b p-4">
        <button
          onClick={onCreate}
          className="w-full rounded-xl bg-black px-4 py-3 text-white transition hover:bg-zinc-800"
        >
          + New Chat
        </button>
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
          />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
