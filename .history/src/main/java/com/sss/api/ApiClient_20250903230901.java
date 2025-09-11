package com.sss.api;

import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;

public class ApiClient {
    private static final String API_KEY = "YOUR_API_KEY"; // put your AllSportsAPI key here
    private static final String BASE_URL = "https://apiv2.allsportsapi.com/football/";

    public String getLeagues() {
        HttpResponse<JsonNode> response = Unirest.get(BASE_URL)
                .queryString("met", "Leagues")
                .queryString("APIkey", API_KEY)
                .asJson();

        return response.getBody().toString();
    }

    public String getPlayers(int leagueId, String season) {
        HttpResponse<JsonNode> response = Unirest.get(BASE_URL)
                .queryString("met", "Players")
                .queryString("leagueId", leagueId)
                .queryString("season", season)
                .queryString("APIkey", API_KEY)
                .asJson();

        return response.getBody().toString();
    }
}