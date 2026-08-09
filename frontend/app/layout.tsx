import Navbar from "@/components/common/navbar";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DevMate AI",
  description: "AI Assistant for Frontend Developers.",
  keywords: [
    "DevMate AI",
    "AI Assistant",
    "AI Developer Assistant",
    "Frontend Developer",
    "Code Assistant",
    "Next.js",
    "TypeScript",
  ],

  authors: [
    {
      name: "Zaki Waliyan Isnanto",
    },
  ],

  applicationName: "DevMate AI",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "DevMate AI",
    description: "AI Assistant for Frontend Developers.",
    type: "website",
    siteName: "DevMate AI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="relative flex h-screen flex-col overflow-hidden">
        {" "}
        <Navbar />
        {children}
      </body>
    </html>
  );
}
