import express from "express";
import cors from "cors";

import chatRoute from "./routes/chat.route";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Backend Running 🚀",
  });
});

app.use("/api/chat", chatRoute);

export default app;