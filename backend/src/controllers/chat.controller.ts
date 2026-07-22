import { Request, Response } from "express";
import { generateResponse } from "../services/chat.service";

export const chatController = async (
  req: Request,
  res: Response
) => {
  try {
    const { message } = req.body;

    const image = req.file;

    /**
     * Sprint 5.2
     * Untuk sementara kita hanya memastikan
     * image berhasil diterima.
     */
    console.log("Message:", message);

    console.log("Image:", image);

    const response = await generateResponse({ message, image });

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