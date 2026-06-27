import { Request, Response } from "express";
import { generateResponse } from "../services/chat.service";

export const chatController = async (
  req: Request,
  res: Response
) => {
  try {
    const { message } = req.body;

    const response = await generateResponse(message);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};