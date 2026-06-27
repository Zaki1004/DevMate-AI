import { Bot } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 rounded-full bg-muted p-4">
        <Bot className="h-8 w-8" />
      </div>

      <h1 className="text-3xl font-bold">Hi, I'm DevMate AI 👋</h1>

      <p className="mt-4 max-w-xl text-muted-foreground">
        Ask me anything about React, Next.js, TypeScript, Tailwind CSS,
        Express.js, JavaScript, HTML, CSS, and Git.
      </p>
    </div>
  );
};

export default EmptyState;
