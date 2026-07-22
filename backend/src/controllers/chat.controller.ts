import { Request, Response } from "express";
import { generateResponse } from "../services/chat.service";

export const chatController = async (
  req: Request,
  res: Response
) => {
  try {
    const { message, sourceCode } = req.body;

    const image = req.file;

    console.log("Message:", message);
    console.log("Source Code:", sourceCode);
    console.log("Image:", image);

    const response = await generateResponse({ message, sourceCode, image });

    return res.status(200).json({
      ...response,

      uploadedImage: image
        ? {
            filename: image.filename,
            originalName: image.originalname,
            mimetype: image.mimetype,
            size: image.size,
          }
        : null,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};