import { Bot } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 text-center animate-in fade-in duration-700">
      <div className="mb-6 rounded-lg bg-muted p-2 bg-zinc-200">
        <Bot className="h-10 w-10 sm:h-11 sm:w-11 animate-pulse" />
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold">Hi, I'm DevMate AI 👋</h1>

      <p className="mt-4 max-w-xl text-muted-foreground text-sm sm:text-base lg:text-lg">
        Ask me anything about React, Next.js, TypeScript, Tailwind CSS,
        Express.js, JavaScript, HTML, CSS, and Git.
      </p>
    </div>
  );
};

export default EmptyState;
