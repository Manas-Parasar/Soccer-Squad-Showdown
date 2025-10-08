import axios from "axios";

const API_KEY = process.env.API_FOOTBALL_KEY;
if (!API_KEY) throw new Error("API_FOOTBALL_KEY missing in .env");

export async function fetchPlayerFromAPI(playerName) {
  const leagues = [140, 39, 78]; // La Liga, Premier League, Ligue 1 (example)
  for (const league of leagues) {
    try {
      const response = await axios.get(
        "https://v3.football.api-sports.io/players",
        {
          params: {
            search: playerName,
            league,
            season: 2023,
          },
          headers: {
            "x-apisports-key": API_KEY,
          },
        }
      );

      if (response.data.results > 0) {
        return response.data.response[0]; // Return first match
      }
    } catch (err) {
      console.error("API-Football fetch error:", err.message);
    }
  }
  return null;
}
