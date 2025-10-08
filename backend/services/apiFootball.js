// services/apiFootball.js
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.API_FOOTBALL_KEY;
if (!API_KEY) throw new Error("API_FOOTBALL_KEY missing in .env");

// league IDs to support
const leagues = [
  140, // La Liga
  39, // Premier League
  78, // Serie A
  61, // Ligue 1
  107, // Bundesliga
  253, // MLS
  308, // Saudi Pro League
];

export async function fetchPlayerFromAPI(playerName) {
  for (const league of leagues) {
    try {
      const response = await axios.get(
        "https://v3.football.api-sports.io/players",
        {
          params: { search: playerName, league, season: 2023 },
          headers: { "x-apisports-key": API_KEY },
        }
      );

      if (response.data.results > 0) {
        const p = response.data.response[0].player;
        const t = response.data.response[0].statistics[0].team;

        return {
          name: p.name,
          team: t.name,
          nationality: p.nationality,
          age: p.age,
          image: p.photo,
          preferredPosition:
            response.data.response[0].statistics[0].games.position,
          secondaryPositions: [], // can enhance later
        };
      }
    } catch (err) {
      console.error(
        `Error fetching ${playerName} in league ${league}:`,
        err.message
      );
    }
  }
  return null;
}
