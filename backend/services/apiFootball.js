// services/apiFootball.js
import "../loadEnv.js";
import { generatePlayerStats } from "./generatePlayerStats.js";
import { predefinedPlayers } from "../predefinedPlayers.js";
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
  308, // Saudi Pro League
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
  let searchTerms = playerName.includes(" ")
    ? [lastWord, playerName]
    : [playerName, "C. " + playerName];

  // Add full names for common players
  if (playerName.toLowerCase() === "ronaldo") {
    searchTerms.push("Cristiano Ronaldo");
  }
  if (playerName.toLowerCase() === "messi") {
    searchTerms.push("Lionel Messi");
  }
  // Add more as needed

  for (const league of leagues) {
    try {
      for (const searchTerm of searchTerms) {
        let found = false;
        // Try seasons 2023 first, then 2024
        for (const season of [2023, 2024]) {
          const response = await axios.get(
            "https://v3.football.api-sports.io/players",
            {
              params: { search: searchTerm, league, season },
              headers: { "x-apisports-key": API_KEY },
            }
          );

          if (response.data.response && response.data.response.length > 0) {
            console.log(
              "API response for",
              playerName,
              "with term",
              searchTerm,
              "season",
              season,
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
                team:
                  hasStats && stats[0].team ? stats[0].team.name : "Unknown",
                nationality: p.nationality,
                age: p.age,
                imageUrl: p.photo || "/images/default.jpg",
                preferredPosition: mappedPosition,
                secondaryPositions: getSecondaryPositions(mappedPosition),
              });
            });
            found = true;
            break; // Found in this season, no need to try other seasons
          }
        }
        if (found) break; // Found in this league, no need to try other terms
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
  let uniquePlayers = [
    ...new Map(foundPlayers.map((p) => [p.name, p])).values(),
  ];

  // Fallback for Ronaldo if not found in API
  if (uniquePlayers.length === 0 && playerName.toLowerCase() === "ronaldo") {
    const ronaldo = predefinedPlayers.forwards.find((p) =>
      p.name.toLowerCase().includes("ronaldo")
    );
    if (ronaldo) {
      const stats = generatePlayerStats({ player: ronaldo, statistics: [] });
      uniquePlayers = [
        {
          ...stats,
          name: ronaldo.name,
          team: ronaldo.team,
          nationality: ronaldo.nationality,
          age: ronaldo.age,
          imageUrl: ronaldo.image || "/images/default.jpg",
          preferredPosition: ronaldo.position,
          secondaryPositions: [],
        },
      ];
    }
  }

  return uniquePlayers;
}
