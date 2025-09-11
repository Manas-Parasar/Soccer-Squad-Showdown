package com.sss;

import static spark.Spark.*;
import com.google.gson.Gson;
import com.sss.api.ApiClient;

public class App {
    public static void main(String[] args) {
        port(4567);

        staticFiles.externalLocation("../frontend");

        ApiClient apiClient = new ApiClient();
        Gson gson = new Gson();

        // Endpoint: get players by search
        get("/players", (req, res) -> {
            String query = req.queryParams("name");
            res.type("application/json");
            return gson.toJson(apiClient.searchPlayers(query));
        });

        // Endpoint: simulate match
        get("/simulate", (req, res) -> {
            String teamA = req.queryParams("teamA");
            String teamB = req.queryParams("teamB");
            res.type("application/json");
            return gson.toJson(apiClient.simulateMatch(teamA, teamB));
        });
    }
}