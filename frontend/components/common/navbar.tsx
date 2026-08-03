"use client";

import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  if (pathname === "/chat") {
    return null;
  }

  return (
    <header
      className="
    sticky
    top-0
    z-30
    border-b
    bg-white/90
    backdrop-blur-md transition-all
duration-300
  "
    >
      <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">DevMate AI</h1>

          <p
            className="text-xs

text-zinc-500

sm:text-sm

lg:text-base"
          >
            AI Assistant for Developers
          </p>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
