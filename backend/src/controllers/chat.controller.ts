import { Request, Response } from "express";
import { generateStreamResponse } from "../services/chat.service";

export const chatController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { message, sourceCode } = req.body;
    const image = req.file;

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    const stream = generateStreamResponse({
      message,
      sourceCode,
      image,
    });

    for await (const token of stream) {
      res.write(token);
    }

    res.end();
  } catch (error) {
    console.error(error);

    if (!res.headersSent) {
      res.status(500).send("Internal Server Error");
    } else {
      res.end();
    }
  }
};