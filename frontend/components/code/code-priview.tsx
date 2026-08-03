import { CodeXml, X } from "lucide-react";

type Props = {
  sourceCode: string;
  onRemove: () => void;
};

const CodePreview = ({ sourceCode, onRemove }: Props) => {
  const lineCount =
    sourceCode.trim() === "" ? 0 : sourceCode.split("\n").length;

  return (
    <div className="mb-3 flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-zinc-100 p-2">
          <CodeXml className="h-5 w-5" />
        </div>

        <div>
          <p className="text-sm font-medium">Code Snippet</p>

          <p className="text-xs text-muted-foreground">
            {lineCount} lines • Ready to send
          </p>
        </div>
      </div>

      <button
        onClick={onRemove}
        className="rounded-md p-1 transition hover:bg-red-100"
      >
        <X className="h-4 w-4 text-red-500" />
      </button>
    </div>
  );
};

export default CodePreview;
