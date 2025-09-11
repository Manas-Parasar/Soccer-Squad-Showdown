package com.sss;

import com.sss.api.ApiClient;

public class Main {
    public static void main(String[] args) {
        ApiClient api = new ApiClient();

        try {
            // Test leagues
            String leagues = api.getLeagues();
            System.out.println("Leagues: " + leagues);

            // Test players (Premier League, 2023 season example)
            String players = api.getPlayers(152, "2023");
            System.out.println("Players: " + players);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}