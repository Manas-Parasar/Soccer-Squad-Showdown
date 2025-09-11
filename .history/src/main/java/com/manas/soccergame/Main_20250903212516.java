package com.yourname.soccergame;

public class Main {
    public static void main(String[] args) {
        // Replace with your real API key
        String apiKey = "YOUR_API_KEY_HERE";
        AllSportsAPI api = new AllSportsAPI(apiKey);

        // Test endpoints
        api.getLeagues();                // list all leagues
        api.getTeams(152);               // e.g. Premier League (id = 152, example)
        api.getPlayers(2614);            // e.g. Manchester United (id = 2614, example)
        api.getFixtures(152, "2024/2025"); // season format "YYYY/YYYY"
        api.getLivescore();              // current live matches
    }
}