import { Request, Response } from "express";

import { generateStreamResponse } from "../services/chat.service";

export const chatController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { message, sourceCode } = req.body;
    const image = req.file;

    console.log("Message:", message);
    console.log("Source Code:", sourceCode);
    console.log("Image:", image);

    /**
     * HTTP Streaming Header
     */
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    res.flushHeaders();

    /**
     * Stream token dari Groq
     */
    const stream = generateStreamResponse({
      message,
      sourceCode,
      image,
    });

    for await (const token of stream) {
      console.log("SEND :", token)
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