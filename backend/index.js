import "./loadEnv.js"; // ✅ loads .env first

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import playersRouter from "./routes/players.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/api/players", playersRouter);

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// Health check
app.get("/api/health", (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
