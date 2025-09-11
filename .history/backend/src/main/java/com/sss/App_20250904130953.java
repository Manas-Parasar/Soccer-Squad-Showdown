package com.sss;

import static spark.Spark.*;

import com.sss.api.ApiClient;
import com.sss.model.Player;
import com.google.gson.Gson;

import java.util.List;

public class App {

    public static void main(String[] args) {
        port(4567);  // Run server on localhost:4567

        // Serve static frontend files
        staticFiles.externalLocation("../frontend");

        // Endpoint to search players from API
        get("/api/search/:name", (req, res) -> {
            String name = req.params(":name");
            List<Player> players = ApiClient.searchPlayers(name);
            res.type("application/json");
            return new Gson().toJson(players);
        });

        System.out.println("Server running at http://localhost:4567");
    }
}