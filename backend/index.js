import "./loadEnv.js"; // ✅ loads .env first

// index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import playersRoute from "./routes/players.js";
import path from "path";
import { fileURLToPath } from "url";

let backendRunning = false; // Flag to track backend status
let backendInterval = null; // Interval reference for automatic tasks

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

app.post("/start-backend", (req, res) => {
  if (backendRunning) {
    console.log("Backend already running.");
    return res.json({ status: "already running" });
  }

  backendRunning = true;
  console.log("Backend started.");

  // Optional: periodic task (e.g., prefetch API players every 10s)
  backendInterval = setInterval(() => {
    console.log("Backend periodic task running...");
    // Call your prefetch/fetch logic here, e.g., fetchPlayerFromAPI for popular players
  }, 10000); // runs every 10s

  res.json({ status: "started" });
});

app.post("/stop-backend", (req, res) => {
  if (!backendRunning) {
    console.log("Backend is not running.");
    return res.json({ status: "not running" });
  }

  backendRunning = false;
  if (backendInterval) {
    clearInterval(backendInterval);
    backendInterval = null;
  }
  console.log("Backend stopped.");
  res.json({ status: "stopped" });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

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
