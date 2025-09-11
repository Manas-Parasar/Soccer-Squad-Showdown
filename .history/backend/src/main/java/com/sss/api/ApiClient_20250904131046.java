package com.sss.api;

import com.sss.model.Player;
import kong.unirest.Unirest;
import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.json.JSONArray;

import java.util.ArrayList;
import java.util.List;

public class ApiClient {

    private static final String API_KEY = "3b6045370088b5d2201305f592031f37c4e5fff7cd622e65d3dbdbaac509bde2";

    public static List<Player> searchPlayers(String name) {
        List<Player> playerList = new ArrayList<>();

        try {
            HttpResponse<JsonNode> response = Unirest.get("https://allsportsapi.com/api/soccer/player?name=" + name + "&api_key=" + API_KEY)
                    .asJson();

            JSONArray data = response.getBody().getArray();
            for (int i = 0; i < data.length(); i++) {
                var obj = data.getJSONObject(i);
                String playerName = obj.getString("player_name");
                String position = obj.getString("position");
                String image = obj.optString("image", "images/players/default.png");
                playerList.add(new Player(playerName, position, image));
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return playerList;
    }
}