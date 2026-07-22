import { Attachment } from "@/types/chat";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type ChatBubbleProps = {
  message: string;
  isUser: boolean;
  attachment?: Attachment;
};

const ChatBubble = ({ message, isUser, attachment }: ChatBubbleProps) => {
  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`my-3 max-w-3xl rounded-2xl px-5 py-4 text-sm leading-7 shadow-sm ${
          isUser ? "bg-black text-white" : "border bg-gray-50"
        }`}
      >
        {attachment && (
          <div className="mb-4">
            <img
              src={attachment.preview}
              alt={attachment.name}
              className="max-h-64 w-full rounded-xl object-cover"
            />

            <p
              className={`mt-2 text-xs ${
                isUser ? "text-gray-300" : "text-gray-500"
              }`}
            >
              {attachment.name}
            </p>
          </div>
        )}
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{message}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ChatBubble;
