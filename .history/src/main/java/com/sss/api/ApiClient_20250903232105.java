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
    private static final String API_URL = "https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=";

    public List<PlayerSearchResult> searchPlayers(String playerName) {
        List<PlayerSearchResult> results = new ArrayList<>();

        HttpResponse<JsonNode> response = Unirest.get(API_URL + playerName).asJson();

        if (response.getStatus() == 200) {
            String json = response.getBody().toString();
            JsonElement root = JsonParser.parseString(json);

            if (root.isJsonObject() && root.getAsJsonObject().has("player")) {
                JsonArray players = root.getAsJsonObject().getAsJsonArray("player");

                for (JsonElement el : players) {
                    String id = el.getAsJsonObject().get("idPlayer").getAsString();
                    String name = el.getAsJsonObject().get("strPlayer").getAsString();
                    String pos = el.getAsJsonObject().get("strPosition").isJsonNull() ? "Unknown"
                            : el.getAsJsonObject().get("strPosition").getAsString();
                    String team = el.getAsJsonObject().get("strTeam").isJsonNull() ? "Free Agent"
                            : el.getAsJsonObject().get("strTeam").getAsString();

                    results.add(new PlayerSearchResult(id, name, pos, team));
                }
            }
        }

        return results;
    }
}