"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useCallback, useState } from "react";
import { Check, Copy } from "lucide-react";
import { syntaxTheme } from "./syntax-themes";
import { Button } from "../ui/button";
import { detectLanguage } from "@/utils/detect-language/index";

type CodeBlockProps = {
  language?: string;
  value: string;
};

const CodeBlock = ({ language, value }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const displayLanguage =
    language === "text" ? "Plain Text" : language?.toUpperCase();

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(value);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [value]);

  const detectedLanguage =
    language && language !== "text"
      ? {
          technology: language.toUpperCase(),
          syntax: language,
        }
      : detectLanguage(value);

  return (
    <div className="my-5 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-900 shadow-sm">
      <div className="overflow-x-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-700 bg-zinc-800 px-4 py-2">
          <span className="text-xs font-medium uppercase tracking-wide text-zinc-300">
            {detectedLanguage.technology}
          </span>

          <Button
            type="button"
            onClick={handleCopy}
            disabled={copied}
            className="flex items-center gap-2 rounded-md px-2 py-1 text-xs text-zinc-300 transition hover:bg-zinc-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            {copied ? (
              <>
                <Check size={14} />
                Copied
              </>
            ) : (
              <>
                <Copy size={14} />
                Copy
              </>
            )}
          </Button>
        </div>

        {/* Code */}
        <SyntaxHighlighter
          language={detectedLanguage.syntax}
          style={syntaxTheme}
          PreTag="div"
          wrapLongLines
          customStyle={{
            overflowX: "auto",
            margin: 0,
            padding: "18px",
            borderRadius: 0,
            background: "transparent",
            fontSize: "14px",
          }}
          codeTagProps={{
            style: {
              fontFamily: "var(--font-geist-mono)",
            },
          }}
        >
          {value}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBlock;
