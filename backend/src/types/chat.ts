import { Express } from "express";

export interface ChatRequest {
  message: string;
  image?: Express.Multer.File;
  sourceCode?: string;
}

export interface ChatResponse {
  answer: string;
}