import { Attachment } from "@/types/chat";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "@/components/code/code-block";
import { ChevronDown, ChevronUp, CodeXml } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import ResponseActions from "./response-action";

type ChatBubbleProps = {
  message: string;
  isUser: boolean;
  streaming?: boolean;
  attachment?: Attachment;
  codeName?: string;
  sourceCode?: string;
  onCopy?: () => void | Promise<void>;
};

const ChatBubble = ({
  message,
  isUser,
  attachment,
  codeName,
  streaming,
  sourceCode,
  onCopy,
}: ChatBubbleProps) => {
  const [showCodeInput, setShowCodeInput] = useState(false);

  return (
    <div
      className={`flex w-full ${
        isUser ? "justify-end" : "justify-start"
      } animate-in fade-in duration-300`}
    >
      <div
        className={`mt-2 mb-24 sm:mb-20 max-w-[95%]
sm:max-w-[90%]
md:max-w-[82%]
lg:max-w-[75%]
xl:max-w-[70%] overflow-hidden break-words rounded-3xl px-3 py-3 sm:px-4 sm:py-3 shadow-sm hover:shadow-md transition-all duration-200
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
              className="w-full
max-h-52
md:max-h-64
lg:max-h-80
rounded-2xl
object-contain
bg-zinc-100"
            />

            <p
              className={`mt-3 pl-2 text-lg text-black ${
                isUser ? "text-black" : "text-zinc-500"
              }`}
            >
              {attachment.name}
            </p>
          </div>
        )}

        {codeName && (
          <button
            onClick={() => setShowCodeInput(true)}
            className="
        mb-3
        flex
        items-center
        gap-3
        rounded-xl
        border
        border-zinc-200
        bg-zinc-50
        px-4
        py-3
        transition
        hover:bg-zinc-100
    "
          >
            <CodeXml className="h-5 w-5 text-zinc-500" />

            <div className="text-left">
              <p className="text-sm font-medium">{codeName}</p>

              <p className="text-xs text-zinc-500">
                {sourceCode?.split("\n").length} lines
              </p>
            </div>
          </button>
        )}

        {showCodeInput && sourceCode && (
          <div className="mb-4 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-md">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3">
              <div>
                <p className="text-sm font-semibold">{codeName}</p>

                <p className="text-xs text-zinc-500">
                  {sourceCode.split("\n").length} lines
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCodeInput(false)}
              >
                Batal
              </Button>
            </div>

            {/* Code */}
            <div className="max-h-[380px] overflow-y-auto">
              <CodeBlock language="tsx" value={sourceCode} />
            </div>
          </div>
        )}
        <div
          className="    prose-zinc py-2 px-4
          text-lg
    prose-sm
    max-w-none

    prose-headings:font-bold
    prose-headings:text-zinc-900

prose-h1:text-2xl
sm:prose-h1:text-3xl

prose-h2:text-xl
sm:prose-h2:text-2xl

prose-h3:text-lg
sm:prose-h3:text-xl

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
                <div className="my-5 overflow-x-auto rounded-lg">
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
                    <code className="rounded-md bg-zinc-100 px-1.5 font-mono py-0.5 font-mono text-[13px] text-pink-600">
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

          {!streaming && onCopy && (
            <ResponseActions onCopy={onCopy ?? (() => {})} />
          )}

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
