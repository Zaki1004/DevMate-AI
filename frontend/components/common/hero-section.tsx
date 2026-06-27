import Link from "next/link";

import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-3xl text-center">
        <p className="mb-4 text-sm font-medium text-muted-foreground">
          🚀 Powered by Groq
        </p>

        <h1 className="text-5xl font-bold tracking-tight">DevMate AI</h1>

        <p className="mt-6 text-xl text-muted-foreground">
          AI Assistant for Frontend Developers.
        </p>

        <p className="mt-2 text-muted-foreground">
          Build Faster. Debug Smarter. Learn Better.
        </p>

        <Button asChild className="mt-10 h-12 px-8 text-base">
          <Link href="/chat">Start Chat</Link>
        </Button>

        <div className="mt-12 flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
          <span>Next.js</span>
          <span>•</span>
          <span>Express</span>
          <span>•</span>
          <span>TypeScript</span>
          <span>•</span>
          <span>Groq</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
