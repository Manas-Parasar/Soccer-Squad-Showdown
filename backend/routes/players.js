// routes/players.js
import express from "express";
import Player from "../models/Player.js";
import { fetchPlayerFromAPI } from "../services/apiFootball.js";
import { generatePlayerStats } from "../services/generatePlayerStats.js";

const normalize = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const router = express.Router();

// GET /api/players/all
router.get("/players/all", async (req, res) => {
  try {
    let players = await Player.find({});
    // Ensure imageUrl is set
    players = players.map((p) => ({
      ...p.toObject(),
      imageUrl: p.imageUrl || p.image || "/images/default.jpg",
    }));
    res.json(players);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});

// GET /api/players?name=Messi
router.get("/players", async (req, res) => {
  const { name } = req.query;
  if (!name) return res.status(400).json({ message: "Name is required" });

  try {
    // Search MongoDB first
    const normalizedQuery = normalize(name.toLowerCase());
    const existingPlayers = await Player.find({
      nameLower: { $regex: normalizedQuery, $options: "i" },
    });
    if (existingPlayers.length > 0) {
      const players = existingPlayers.map((p) => ({
        ...p.toObject(),
        imageUrl: p.imageUrl || p.image || "/images/default.jpg",
      }));
      return res.json(players);
    }

    // If not found, fetch from API
    const capitalizedName = name.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
    console.log(`Fetching player ${capitalizedName} from API...`);
    const apiPlayers = await fetchPlayerFromAPI(capitalizedName);
    console.log(
      `API returned ${apiPlayers.length} players for ${capitalizedName}`
    );

    if (!apiPlayers || apiPlayers.length === 0) {
      console.log(`Player ${capitalizedName} not found in API`);
      return res.status(404).json({ message: "Player not found" });
    }

    // Process all players from API results
    const playersToReturn = [];
    for (const playerData of apiPlayers) {
      // Generate stats
      const stats = generatePlayerStats(playerData);

      // Check if player already exists
      const existing = await Player.findOne({
        nameLower: normalize(playerData.name.toLowerCase()),
      });
      let playerToReturn;
      if (existing) {
        playerToReturn = existing;
      } else {
        // Create and save new player
        const newPlayer = new Player({
          ...stats,
          ...playerData,
          nameLower: normalize(playerData.name.toLowerCase()),
        });
        newPlayer.preferredPosition = newPlayer.preferredPosition || "ST";
        await newPlayer.save();
        playerToReturn = newPlayer;
      }

      const player = {
        ...playerToReturn.toObject(),
        imageUrl:
          playerToReturn.imageUrl ||
          playerToReturn.image ||
          "/images/default.jpg",
      };
      playersToReturn.push(player);
    }
    res.json(playersToReturn);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});

export default router;
