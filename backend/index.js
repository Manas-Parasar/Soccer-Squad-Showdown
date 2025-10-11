import "./loadEnv.js"; // ✅ loads .env first

// index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import playersRoute from "./routes/players.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// Serve static images
app.use("/images", express.static(path.join(__dirname, "../frontend/images")));

app.use("/api", playersRoute);

const PORT = process.env.PORT || 3001;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/soccerSquadDB";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
