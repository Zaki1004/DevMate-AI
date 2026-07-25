"use client";

import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  if (pathname === "/chat") {
    return null;
  }

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-16 items-center justify-between px-20 py-10">
        <div>
          <h1 className="text-2xl font-bold">DevMate AI</h1>

          <p className="text-xl text-gray-500">AI Assistant for Developers</p>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
