import { LanguageRule } from "./types";

export const frontendRules: LanguageRule[] = [
  // React
  {
    language: "react",
    patterns: [/usestate/i],
  },

  {
    language: "react",
    patterns: [/useeffect/i],
  },

  {
    language: "react",
    patterns: [/reactdom/i],
  },

  {
    language: "react",
    patterns: [/createroot/i],
  },

  // Next.js
  {
    language: "nextjs",
    patterns: [/use client/i],
  },

  {
    language: "nextjs",
    patterns: [/next\/link/i],
  },

  {
    language: "nextjs",
    patterns: [/next\/image/i],
  },

  {
    language: "nextjs",
    patterns: [/generateMetadata/i],
  },

  {
    language: "nextjs",
    patterns: [/app\/layout/i],
  },

  // Vue
  {
    language: "vue",
    patterns: [/<template>/i],
  },

  {
    language: "vue",
    patterns: [/defineComponent/i],
  },

  // Nuxt
  {
    language: "nuxt",
    patterns: [/defineNuxtConfig/i],
  },

  {
    language: "nuxt",
    patterns: [/useFetch/i],
  },

  // Angular
  {
    language: "angular",
    patterns: [/@Component/i],
  },

  {
    language: "angular",
    patterns: [/@Injectable/i],
  },

  // Svelte
  {
    language: "svelte",
    patterns: [/<script>/i],
  },

  {
    language: "sveltekit",
    patterns: [/\+page\.svelte/i],
  },

  // Vite
  {
    language: "vite",
    patterns: [/vite\.config/i],
  },

  {
    language: "vite",
    patterns: [/import\.meta\.env/i],
  },

  // Tailwind
  {
    language: "tailwind",
    patterns: [/@tailwind/i],
  },

  {
    language: "tailwind",
    patterns: [/@apply/i],
  },

  {
    language: "tailwind",
    patterns: [/className=/],
  },

  // Bootstrap
  {
    language: "bootstrap",
    patterns: [/container-fluid/i],
  },

  {
    language: "bootstrap",
    patterns: [/btn-primary/i],
  },

  // MUI
  {
    language: "mui",
    patterns: [/@mui/i],
  },

  {
    language: "mui",
    patterns: [/<Button/i],
  },

  // shadcn
  {
    language: "shadcn",
    patterns: [/@\/components\/ui/i],
  },

  {
    language: "shadcn",
    patterns: [/class-variance-authority/i],
  },

  // HTML
  {
    language: "html",
    patterns: [/<html/i],
  },

  {
    language: "html",
    patterns: [/<body/i],
  },

  // CSS
  {
    language: "css",
    patterns: [/{[\s\S]*}/],
  },

  // SCSS
  {
    language: "scss",
    patterns: [/\$/],
  },

  // JavaScript
  {
    language: "javascript",
    patterns: [/function/i],
  },

  {
    language: "javascript",
    patterns: [/=>/],
  },

  // TypeScript
  {
    language: "typescript",
    patterns: [/: string/],
  },

  {
    language: "typescript",
    patterns: [/interface/i],
  },

  // JSX
  {
    language: "jsx",
    patterns: [/<[A-Z]/],
  },

  // TSX
  {
    language: "tsx",
    patterns: [/useState/i, /return\s*\(/i],
  },

  // JSON
  {
    language: "json",
    patterns: [/^\s*\{/],
  },

  // Markdown
  {
    language: "markdown",
    patterns: [/^#/m],
  },
];