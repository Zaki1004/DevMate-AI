"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

type Props = {
  onCopy: () => Promise<void> | void;
};

const ResponseActions = ({ onCopy }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await onCopy();

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="mt-3 flex items-center">
      <Button
        size="sm"
        variant="ghost"
        onClick={handleCopy}
        className="h-8 gap-2 rounded-lg px-2 text-zinc-500 hover:text-zinc-900"
      >
        {copied ? (
          <>
            <Check size={15} />
            Copied
          </>
        ) : (
          <>
            <Copy size={15} />
            Copy
          </>
        )}
      </Button>
    </div>
  );
};

export default ResponseActions;
