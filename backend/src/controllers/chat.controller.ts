import { Request, Response } from "express";
import { generateStreamResponse } from "../services/chat.service";

export const chatController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { message, sourceCode, history: historyString } = req.body;
    const image = req.file;

     let history = [];

    if (historyString) {
      try {
        history = JSON.parse(historyString);
      } catch {
        return res.status(400).json({
          success: false,
          message: "Invalid chat history.",
        });
      }
    }

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    const stream = generateStreamResponse({
      message,
      sourceCode,
      image,
      history,
    });

    for await (const token of stream) {
      res.write(token);
    }

    res.end();
  } catch (error) {
    console.error(error);

    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: "Failed to generate AI response.",
      });
    } else {
      res.end();
    }
  }
};