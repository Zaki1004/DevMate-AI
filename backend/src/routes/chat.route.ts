import { Router } from "express";

import { upload } from "../middleware/upload.middleware";
import {
  chatController,
} from "../controllers/chat.controller";

const router = Router();

router.post(
  "/",
  upload.single("image"),
  chatController
);

export default router;