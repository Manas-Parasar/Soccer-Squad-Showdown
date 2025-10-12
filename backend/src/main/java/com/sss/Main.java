package com.sss;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.sss.game.MatchSimulation;
import com.sss.game.PlayerManager;
import com.sss.game.Team;
import com.sss.model.*;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static spark.Spark.*;

public class Main {

    private static final Gson gson = new GsonBuilder().setPrettyPrinting().create();
    private static final PlayerManager playerManager = new PlayerManager();

    public static void main(String[] args) {
        port(4568); // Set the port for the Spark server

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

        // Route to start the Node.js API backend
        post("/start-api", (req, res) -> {
            res.type("application/json");
            try {
                boolean isRunning = checkIfNodeBackendRunning();
                if (isRunning) {
                    return gson.toJson(Map.of("status", "already running"));
                } else {
                    startNodeBackend();
                    return gson.toJson(Map.of("status", "started"));
                }
            } catch (Exception e) {
                res.status(500);
                return gson.toJson(Map.of("error", e.getMessage()));
            }
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

    private static boolean checkIfNodeBackendRunning() {
        try {
            URL url = new URL("https://soccer-squad-showdown.onrender.com/health");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setConnectTimeout(1000);
            conn.setReadTimeout(1000);
            int responseCode = conn.getResponseCode();
            return responseCode == 200;
        } catch (Exception e) {
            return false;
        }
    }

    private static void startNodeBackend() throws IOException {
        // Start the Node.js backend in the background
        Runtime.getRuntime().exec("cmd /c start cmd /c \"cd backend && npm run dev\"");
    }
}