package com.sss;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.sss.game.MatchSimulation;
import com.sss.game.PlayerManager;
import com.sss.game.Team;
import com.sss.model.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static spark.Spark.*;

public class Main {

    private static final Gson gson = new GsonBuilder().setPrettyPrinting().create();
    private static final PlayerManager playerManager = new PlayerManager();

    public static void main(String[] args) {
        port(4567); // Set the port for the Spark server

        // Serve static files from the frontend directory
        staticFiles.externalLocation("C:/Dev/Soccer-Squad-Showdown/frontend");

        // Route to get all predefined players
        get("/players/predefined", (req, res) -> {
            res.type("application/json");
            return gson.toJson(playerManager.getAllPlayers());
        });

        // Route to simulate a match
        post("/simulate", (req, res) -> {
            res.type("application/json");
            
            // Assuming the request body contains a list of player names for the user's team
            // Example JSON: { "playerNames": ["Messi", "Modric", ...] }
            Map<String, List<String>> requestBody = gson.fromJson(req.body(), Map.class);
            List<String> userPlayerNames = requestBody.get("playerNames");

            if (userPlayerNames == null || userPlayerNames.size() != 11) {
                res.status(400);
                return gson.toJson(Map.of("error", "Invalid number of players. Please select exactly 11 players."));
            }

            Team userTeam = new Team();
            for (String playerName : userPlayerNames) {
                Player player = playerManager.getPlayerByName(playerName);
                if (player != null) {
                    userTeam.addPlayer(player);
                } else {
                    res.status(400);
                    return gson.toJson(Map.of("error", "Player not found: " + playerName));
                }
            }

            // Generate AI team, ensuring no overlap with user's selected players
            Team aiTeam = playerManager.generateAITeam(userPlayerNames);

            MatchSimulation simulation = new MatchSimulation(userTeam, aiTeam);
            String playByPlay = simulation.simulateMatch();
            String chemistryAnalysis = simulation.getTeamChemistryAnalysis();
            String postMatchAnalysis = simulation.getPostMatchAnalysis();

            return gson.toJson(Map.of(
                "playByPlay", playByPlay,
                "chemistryAnalysis", chemistryAnalysis,
                "postMatchAnalysis", postMatchAnalysis,
                "userTeamStrength", userTeam.calculateTeamStrength(),
                "aiTeamStrength", aiTeam.calculateTeamStrength()
            ));
        });

        // Before-filter to enable CORS
        before((request, response) -> {
            response.header("Access-Control-Allow-Origin", "*");
            response.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            response.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept");
        });

        // Handle OPTIONS requests for CORS preflight
        options("/*", (request, response) -> {
            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }
            String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
            }
            return "OK";
        });

        System.out.println("Spark server started on port 4567. Serving frontend from C:/Dev/Soccer-Squad-Showdown/frontend");
    }
}