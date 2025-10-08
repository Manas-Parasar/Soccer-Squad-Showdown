// routes/players.js
import express from "express";
import Player from "../models/Player.js";
import { fetchPlayerFromAPI } from "../services/apiFootball.js";
import { generatePlayerStats } from "../services/generatePlayerStats.js";

const router = express.Router();

// GET /api/players?name=Messi
router.get("/players", async (req, res) => {
  const { name } = req.query;
  if (!name) return res.status(400).json({ message: "Name is required" });

  try {
    let player = await Player.findOne({ nameLower: name.toLowerCase() });

    if (!player) {
      // fetch from API
      const apiPlayer = await fetchPlayerFromAPI(name);
      if (!apiPlayer)
        return res
          .status(404)
          .json({ message: "Player not found in API-Football" });

      // generate stats
      const stats = generatePlayerStats(apiPlayer.name);

      // save to Mongo
      player = new Player({
        ...apiPlayer,
        ...stats,
        nameLower: apiPlayer.name.toLowerCase(),
      });
      await player.save();
    }

    res.json(player);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});

export default router;
