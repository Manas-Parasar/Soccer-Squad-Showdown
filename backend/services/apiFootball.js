// services/apiFootball.js
import "../loadEnv.js";
import { generatePlayerStats } from "./generatePlayerStats.js";
import axios from "axios";

const API_KEY = process.env.API_FOOTBALL_KEY;
if (!API_KEY) throw new Error("API_FOOTBALL_KEY missing in .env");

// league IDs to support
const leagues = [
  140, // La Liga
  39, // Premier League
  78, // Serie A
  61, // Ligue 1
  107, // Bundesliga
];

// Map API positions to standard positions
function mapPosition(apiPosition) {
  const mapping = {
    Goalkeeper: "GK",
    "Centre-Back": "CB",
    "Left-Back": "LB",
    "Right-Back": "RB",
    "Defensive Midfielder": "CDM",
    "Central Midfielder": "CM",
    "Attacking Midfielder": "CAM",
    "Left Midfielder": "LM",
    "Right Midfielder": "RM",
    "Left Winger": "LW",
    "Right Winger": "RW",
    "Centre-Forward": "ST",
    Striker: "ST",
    Midfielder: "CM", // fallback
    Defender: "CB", // fallback
    Forward: "ST", // fallback
  };
  return mapping[apiPosition] || apiPosition; // if not mapped, use as is
}

// Get secondary positions based on standard position
function getSecondaryPositions(position) {
  const secondary = {
    GK: [],
    CB: ["RB"],
    LB: ["LWB"],
    RB: ["RWB"],
    CDM: ["CM"],
    CM: ["CAM"],
    CAM: ["CM"],
    LM: ["LW"],
    RM: ["RW"],
    LW: ["LM"],
    RW: ["RM"],
    ST: [],
  };
  return secondary[position] || [];
}

export async function fetchPlayerFromAPI(playerName) {
  const foundPlayers = [];
  // Prepare search terms: last word first if has spaces, then full name
  const lastWord = playerName.includes(" ")
    ? playerName.split(" ").pop().charAt(0).toUpperCase() +
      playerName.split(" ").pop().slice(1).toLowerCase()
    : playerName;
  const searchTerms = playerName.includes(" ")
    ? [lastWord, playerName]
    : [playerName];

  for (const league of leagues) {
    try {
      for (const searchTerm of searchTerms) {
        const response = await axios.get(
          "https://v3.football.api-sports.io/players",
          {
            params: { search: searchTerm, league, season: 2023 },
            headers: { "x-apisports-key": API_KEY },
          }
        );

        if (response.data.response && response.data.response.length > 0) {
          console.log(
            "API response for",
            playerName,
            "with term",
            searchTerm,
            response.data.response
          );
          response.data.response.forEach((item) => {
            const p = item.player;
            const stats = item.statistics;
            const hasStats = stats && stats.length > 0;
            const apiPosition =
              hasStats && stats[0].games
                ? stats[0].games.position
                : "Midfielder";
            const mappedPosition = mapPosition(apiPosition);
            foundPlayers.push({
              name: p.name,
              team: hasStats && stats[0].team ? stats[0].team.name : "Unknown",
              nationality: p.nationality,
              age: p.age,
              imageUrl: p.photo || "/images/default.jpg",
              preferredPosition: mappedPosition,
              secondaryPositions: getSecondaryPositions(mappedPosition),
            });
          });
          break; // Found in this league, no need to try other terms
        }
      }
    } catch (err) {
      console.error(
        `Error fetching ${playerName} in league ${league}:`,
        err.message
      );
      if (err.response) {
        console.error("API Response:", err.response.data);
      }
    }
  }
  // Remove duplicates by player name
  const uniquePlayers = [
    ...new Map(foundPlayers.map((p) => [p.name, p])).values(),
  ];
  return uniquePlayers;
}
