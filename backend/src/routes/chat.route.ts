import { Router } from "express";

import { chatController } from "../controllers/chat.controller";
import { upload } from "../middleware/upload.middleware";

const router = Router();

router.post(
  "/",
  upload.single("image"),
  chatController
);

export default router;