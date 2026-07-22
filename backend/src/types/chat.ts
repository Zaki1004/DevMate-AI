import { Express } from "express";

export interface ChatRequest {
  message: string;
  image?: Express.Multer.File;
}

export interface ChatResponse {
  answer: string;
}