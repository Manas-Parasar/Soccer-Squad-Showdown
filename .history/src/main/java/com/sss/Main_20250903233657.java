package com.sss;

import com.sss.api.ApiClient;

public class Main {
    public static void main(String[] args) {
        ApiClient api = new ApiClient();

        try {
            // Test leagues
            // String leagues = api.getLeagues();
            // System.out.println("Leagues: " + leagues);

            // Test searchPlayers (Premier League, 2023 season example)
            //api.searchPlayers("Messi", 10); // Example call, as getPlayers(int, String) is not defined
            // System.out.println("Players: " + players);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}