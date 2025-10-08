import express from "express";
import Player from "../models/Player.js";
import { fetchPlayerFromAPI } from "../services/apiFootball.js";
import { generatePlayerStats } from "../services/generatePlayerStats.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const name = req.query.name;
  if (!name) return res.status(400).json({ message: "Missing player name" });

  const nameLower = name.toLowerCase();

  try {
    // Check if player exists in Mongo
    let player = await Player.findOne({ nameLower });
    if (player) return res.json(player);

    // Fetch from API-Football
    const apiData = await fetchPlayerFromAPI(name);
    if (!apiData)
      return res
        .status(404)
        .json({ message: "Player not found in API-Football" });

    const apiPlayer = apiData.player;
    const statistics = apiData.statistics[0];

    const preferredPosition = statistics?.games?.position || "Midfielder";

    const stats = generatePlayerStats(
      { name: apiPlayer.name, preferredPosition, age: apiPlayer.age },
      statistics
    );

    // Save to MongoDB
    player = new Player({
      name: apiPlayer.name,
      nameLower: apiPlayer.name.toLowerCase(),
      team: statistics.team.name,
      nationality: apiPlayer.nationality,
      age: apiPlayer.age,
      image: apiPlayer.photo,
      preferredPosition,
      secondaryPositions: [],
      ...stats,
    });

    await player.save();

    res.json(player);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});

export default router;
