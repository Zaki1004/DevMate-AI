import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type ChatBubbleProps = {
  message: string;
  isUser: boolean;
};

const ChatBubble = ({ message, isUser }: ChatBubbleProps) => {
  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`my-3 max-w-3xl rounded-2xl px-5 py-4 text-sm leading-7 shadow-sm ${
          isUser ? "bg-black text-white" : "border bg-gray-50"
        }`}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{message}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ChatBubble;
