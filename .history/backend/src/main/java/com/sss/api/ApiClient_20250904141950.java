package com.sss.api;

import kong.unirest.*;
import kong.unirest.json.JSONArray;
import kong.unirest.json.JSONObject;

import java.util.*;

public class ApiClient {
    private static final String API_KEY = "3b6045370088b5d2201305f592031f37c4e5fff7cd622e65d3dbdbaac509bde2";
    private static final String BASE_URL = "https://allsportsapi2.p.rapidapi.com/api/football";

    // Search players
    public List<Map<String, String>> searchPlayers(String name) {
        List<Map<String, String>> players = new ArrayList<>();
        try {
            HttpResponse<JsonNode> response = Unirest.get(BASE_URL + "/search/{name}")
                    .routeParam("name", name)
                    .header("x-rapidapi-key", API_KEY)
                    .header("x-rapidapi-host", "allsportsapi2.p.rapidapi.com")
                    .asJson();

            JSONArray arr = response.getBody().getObject().optJSONArray("result");
            if (arr != null) {
                for (int i = 0; i < arr.length(); i++) {
                    JSONObject p = arr.getJSONObject(i);
                    Map<String, String> player = new HashMap<>();
                    player.put("id", p.optString("player_key"));
                    player.put("name", p.optString("player_name"));
                    player.put("team", p.optString("team_name"));
                    player.put("position", p.optString("player_type"));
                    player.put("image", p.optString("player_image", "/images/players/default.png"));
                    players.add(player);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return players;
    }

    // Simulate match
    public Map<String, Object> simulateMatch(String teamA, String teamB) {
        Map<String, Object> result = new HashMap<>();
        Random rand = new Random();
        int goalsA = rand.nextInt(5);
        int goalsB = rand.nextInt(5);

        result.put("teamA", teamA);
        result.put("teamB", teamB);
        result.put("scoreA", goalsA);
        result.put("scoreB", goalsB);

        if (goalsA > goalsB) result.put("winner", teamA);
        else if (goalsB > goalsA) result.put("winner", teamB);
        else result.put("winner", "Draw");

        return result;
    }
}
