package com.manas.soccergame;

import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class AllSportsAPI {
    private final String apiKey;

    public AllSportsAPI(String apiKey) {
        this.apiKey = apiKey;
    }

    // Get leagues
    public void getLeagues() {
        String url = "https://apiv2.allsportsapi.com/football/?met=Leagues&APIkey=" + apiKey;
        fetchAndPrint(url, "Leagues");
    }

    // Get teams in a league
    public void getTeams(int leagueId) {
        String url = "https://apiv2.allsportsapi.com/football/?met=Teams&leagueId=" + leagueId + "&APIkey=" + apiKey;
        fetchAndPrint(url, "Teams");
    }

    // Get players on a team
    public void getPlayers(int teamId) {
        String url = "https://apiv2.allsportsapi.com/football/?met=Players&teamId=" + teamId + "&APIkey=" + apiKey;
        fetchAndPrint(url, "Players");
    }

    // Get fixtures for a league and season
    public void getFixtures(int leagueId, String season) {
        String url = "https://apiv2.allsportsapi.com/football/?met=Fixtures&leagueId=" + leagueId +
                     "&season=" + season + "&APIkey=" + apiKey;
        fetchAndPrint(url, "Fixtures");
    }

    // Get live scores
    public void getLivescore() {
        String url = "https://apiv2.allsportsapi.com/football/?met=Livescore&APIkey=" + apiKey;
        fetchAndPrint(url, "Livescore");
    }

    // Helper method: fetch & pretty-print
    private void fetchAndPrint(String url, String label) {
        try {
            HttpResponse<JsonNode> response = Unirest.get(url).asJson();
            if (response.getStatus() == 200) {
                JsonObject json = JsonParser.parseString(response.getBody().toString()).getAsJsonObject();
                System.out.println("=== " + label + " Data ===");
                System.out.println(json);
            } else {
                System.out.println("API request failed: " + response.getStatus());
            }
        } catch (Exception e) {
            System.out.println("Error fetching " + label + ": " + e.getMessage());
        }
    }
}