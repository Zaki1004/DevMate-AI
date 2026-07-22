type CodeInputProps = {
  value: string;
  onChange: (value: string) => void;
};

const CodeInput = ({ value, onChange }: CodeInputProps) => {
  return (
    <div className="mb-4 rounded-xl border bg-white p-3">
      <p className="mb-2 text-sm font-medium text-gray-600">Source Code</p>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your source code here..."
        className="h-56 w-full resize-none rounded-lg border p-3 font-mono text-sm outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
};

export default CodeInput;
