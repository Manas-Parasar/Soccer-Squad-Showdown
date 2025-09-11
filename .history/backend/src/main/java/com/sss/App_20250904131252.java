package com.sss;

import static spark.Spark.*;

import com.sss.api.ApiClient;
import com.sss.model.Player;
import com.google.gson.Gson;

import java.util.List;

public class App {

    public static void main(String[] args) {
        port(4567);

        // Serve frontend static files
        staticFiles.externalLocation("../frontend");

        // API endpoint for player search
        get("/api/search/:name", (req, res) -> {
            String name = req.params(":name");
            List<Player> players = ApiClient.searchPlayers(name);
            res.type("application/json");
            return new Gson().toJson(players);
        });

        System.out.println("Server running at http://localhost:4567");
    }
}