export interface ChatRequest {
  message: string;
  image?: Express.Multer.File;
  sourceCode?: string;
  history?: ChatHistoryMessage[];
}

export interface ChatResponse {
  answer: string;
}

export type ChatHistoryMessage = {
  role: "user" | "assistant";
  content: string;
};