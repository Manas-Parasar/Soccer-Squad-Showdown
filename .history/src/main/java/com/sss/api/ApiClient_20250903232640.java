package com.sss.api;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;

import java.util.ArrayList;
import java.util.List;

public class ApiClient {

    private static final String API_KEY = "3b6045370088b5d2201305f592031f37c4e5fff7cd622e65d3dbdbaac509bde2";
    private static final String API_URL = "https://allsportsapi.com/api/football/";

    public List<PlayerSearchResult> searchPlayers(String name) {
        List<PlayerSearchResult> results = new ArrayList<>();
        try {
            HttpResponse<JsonNode> response = Unirest.get(API_URL)
                    .queryString("met", "Players")
                    .queryString("APIkey", API_KEY)
                    .queryString("playerName", name)
                    .asJson();

            JsonArray array = JsonParser.parseString(response.getBody().toString())
                    .getAsJsonObject()
                    .getAsJsonArray("result");

            for (JsonElement e : array) {
                var obj = e.getAsJsonObject();
                results.add(new PlayerSearchResult(
                        obj.get("player_key").getAsString(),
                        obj.get("player_name").getAsString(),
                        obj.get("player_type").getAsString(),
                        obj.get("team_name").getAsString()
                ));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return results;
    }
}