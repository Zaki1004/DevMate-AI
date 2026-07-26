import { Attachment } from "@/types/chat";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "@/components/code/code-block";

type ChatBubbleProps = {
  message: string;
  isUser: boolean;
  streaming?: boolean;
  attachment?: Attachment;
};

const ChatBubble = ({
  message,
  isUser,
  attachment,
  streaming,
}: ChatBubbleProps) => {
  return (
    <div
      className={`flex w-full ${
        isUser ? "justify-end" : "justify-start"
      } animate-in fade-in duration-300`}
    >
      <div
        className={`my-2 max-w-[92%] sm:max-w-[85%] lg:max-w-[75%] overflow-hidden break-words rounded-3xl px-2 py-2 shadow-sm hover:shadow-md transition-all duration-200
    ${
      isUser
        ? "bg-gray-200 text-black"
        : "border border-zinc-200 bg-white text-zinc-800"
    }
  `}
      >
        {attachment && (
          <div className="mb-4">
            <img
              src={attachment.preview}
              alt={attachment.name}
              className="max-h-72 w-full rounded-2xl object-cover shadow-sm"
            />

            <p
              className={`mt-3 text-xs ${
                isUser ? "text-zinc-300" : "text-zinc-500"
              }`}
            >
              {attachment.name}
            </p>
          </div>
        )}
        <div
          className="    prose-zinc py-2 px-4
    prose-sm
    max-w-none

    prose-headings:font-bold
    prose-headings:text-zinc-900

    prose-h1:text-3xl
    prose-h2:text-2xl
    prose-h3:text-xl

    prose-p:leading-8

    prose-ul:list-disc
    prose-ol:list-decimal

    prose-li:my-1
    prose-li:marker:text-zinc-500

    prose-blockquote:border-l-4
    prose-blockquote:border-zinc-300
    prose-blockquote:pl-4
    prose-blockquote:italic

    prose-table:w-full
    prose-table:border-collapse

    prose-th:border
    prose-th:bg-zinc-100
    prose-th:p-2

    prose-td:border
    prose-td:p-2

    prose-a:text-blue-600
    prose-a:no-underline
    hover:prose-a:underline

    prose-hr:my-8

    prose-code:rounded
    prose-code:bg-zinc-100
    prose-code:px-1.5
    prose-code:py-0.5
    prose-code:font-mono
    prose-code:text-red-600

    dark:prose-invert"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="mb-4 mt-6 text-3xl font-bold">{children}</h1>
              ),

              h2: ({ children }) => (
                <h2 className="mb-3 mt-6 text-2xl font-semibold">{children}</h2>
              ),

              h3: ({ children }) => (
                <h3 className="mb-2 mt-5 text-xl font-semibold">{children}</h3>
              ),

              p: ({ children }) => (
                <p className="leading-7 whitespace-pre-wrap">{children}</p>
              ),

              ul: ({ children }) => (
                <ul className="mb-4 list-disc space-y-2 pl-6">{children}</ul>
              ),

              ol: ({ children }) => (
                <ol className="mb-4 list-decimal space-y-2 pl-6">{children}</ol>
              ),

              li: ({ children }) => <li className="leading-7">{children}</li>,

              blockquote: ({ children }) => (
                <blockquote className="my-4 border-l-4 border-zinc-300 pl-4 italic text-zinc-600">
                  {children}
                </blockquote>
              ),

              strong: ({ children }) => (
                <strong className="font-semibold">{children}</strong>
              ),

              em: ({ children }) => <em className="italic">{children}</em>,

              hr: () => <hr className="my-6 border-zinc-200" />,

              table: ({ children }) => (
                <div className="my-5 overflow-x-auto">
                  <table className="min-w-full border border-zinc-200">
                    {children}
                  </table>
                </div>
              ),

              thead: ({ children }) => (
                <thead className="bg-zinc-100">{children}</thead>
              ),

              tbody: ({ children }) => <tbody>{children}</tbody>,

              tr: ({ children }) => <tr className="border-b">{children}</tr>,

              th: ({ children }) => (
                <th className="border px-3 py-2 text-left font-semibold">
                  {children}
                </th>
              ),

              td: ({ children }) => (
                <td className="border px-3 py-2">{children}</td>
              ),

              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 underline underline-offset-2 hover:text-blue-700"
                >
                  {children}
                </a>
              ),

              code({ className, children }) {
                const match = /language-(\w+)/.exec(className ?? "");

                if (!match) {
                  return (
                    <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px] text-pink-600">
                      {children}
                    </code>
                  );
                }

                return (
                  <CodeBlock
                    language={match[1]}
                    value={String(children).replace(/\n$/, "")}
                  />
                );
              },
            }}
          >
            {message}
          </ReactMarkdown>

          {streaming && !isUser && (
            <span
              className="
      ml-1
      inline-block
      animate-pulse
      font-bold
      text-zinc-500
    "
            >
              ▍
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
