export type ProgrammingLanguage =
  | "html"
  | "css"
  | "scss"
  | "javascript"
  | "typescript"
  | "jsx"
  | "tsx"
  | "json"
  | "markdown"
  | "react"
  | "nextjs"
  | "vue"
  | "nuxt"
  | "angular"
  | "svelte"
  | "sveltekit"
  | "vite"
  | "tailwind"
  | "bootstrap"
  | "mui"
  | "shadcn"
  | "node"
  | "express"
  | "nestjs"
  | "fastify"
  | "graphql"
  | "rest"
  | "go"
  | "gin"
  | "fiber"
  | "echo"
  | "chi"
  | "php"
  | "laravel"
  | "codeigniter"
  | "symfony"
  | "sql"
  | "mysql"
  | "postgresql"
  | "python"
  | "yaml"
  | "dockerfile"
  | "bash"
  | "dart"
  | "flutter"
  | "react-native"
  | "kotlin"
  | "swift"
  | "java"
  | "spring"
  | "csharp"
  | "aspnet"
  | "cpp"
  | "c"
  | "text";

export interface LanguageRule {
  language: ProgrammingLanguage;
  patterns: RegExp[];
}

export interface LanguageScore {
  technology: string;
  syntax: string;
  score: number;
}