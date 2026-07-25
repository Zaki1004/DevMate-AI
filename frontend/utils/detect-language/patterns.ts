export const LANGUAGE_PATTERNS = [
  {
    technology: "Next.js",
    syntax: "tsx",

    patterns: [
      /next\/image/,
      /next\/link/,
      /next\/navigation/,
      /generateMetadata/,
      /useRouter/,
      /useSearchParams/,
      /app\//,
      /layout\.tsx/,
      /page\.tsx/,
    ],
  },

  {
    technology: "React",
    syntax: "tsx",

    patterns: [
      /useState/,
      /useEffect/,
      /useMemo/,
      /useCallback/,
      /React/,
      /jsx/,
      /tsx/,
      /createContext/,
      /useContext/,
    ],
  },

  {
    technology: "TypeScript",
    syntax: "typescript",

    patterns: [
      /interface/,
      /type\s/,
      /:\s*string/,
      /:\s*number/,
      /:\s*boolean/,
      /<.*?>/,
    ],
  },

  {
    technology: "JavaScript",
    syntax: "javascript",

    patterns: [
      /const/,
      /let/,
      /function/,
      /=>/,
      /import/,
      /export/,
    ],
  },

  {
    technology: "HTML",
    syntax: "html",

    patterns: [
      /<html/,
      /<body/,
      /<div/,
      /<button/,
      /<form/,
    ],
  },

  {
    technology: "CSS",
    syntax: "css",

    patterns: [
      /display:/,
      /position:/,
      /margin:/,
      /padding:/,
      /color:/,
      /background:/,
    ],
  },
];