package com.sss.api;

import com.google.gson.*;
import java.net.http.*;
import java.net.URI;
import java.time.Duration;
import java.util.*;
import java.util.concurrent.CompletableFuture;

/**
 * Scaffold: implement for your chosen provider (API-Football, SportMonks, etc.)
 * - Set BASE_URL
 * - Set appropriate headers (API keys)
 * - Update parseSearchResponse to match provider JSON
 */
public class ApiClient {
    private static final String BASE_URL = "https://api-football-v1.p.rapidapi.com/v3"; // replace if needed
    private final HttpClient http = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10))
            .build();
    private final Gson gson = new Gson();

    public CompletableFuture<List<PlayerSearchResult>> searchPlayers(String name) {
        String endpoint = BASE_URL + "/players?search=" + uriEncode(name);
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(endpoint))
                .timeout(Duration.ofSeconds(10))
                .header("X-RapidAPI-Key", "YOUR_API_KEY_HERE")        // <-- put your key
                .header("X-RapidAPI-Host", "api-football-v1.p.rapidapi.com") // <-- host for RapidAPI
                .GET()
                .build();

        return http.sendAsync(request, HttpResponse.BodyHandlers.ofString())
                .thenApply(HttpResponse::body)
                .thenApply(this::parseSearchResponse)
                .exceptionally(ex -> {
                    ex.printStackTrace();
                    return List.of();
                });
    }

    private List<PlayerSearchResult> parseSearchResponse(String body) {
        List<PlayerSearchResult> out = new ArrayList<>();
        try {
            JsonElement root = JsonParser.parseString(body);
            JsonObject obj = root.getAsJsonObject();
            JsonArray arr = obj.has("response") ? obj.getAsJsonArray("response") : null;
            if (arr != null) {
                for (JsonElement el : arr) {
                    JsonObject item = el.getAsJsonObject();
                    JsonObject playerObj = item.has("player") ? item.getAsJsonObject("player") : item;
                    String name = playerObj.has("name") ? playerObj.get("name").getAsString() : "Unknown";
                    String position = playerObj.has("position") ? playerObj.get("position").getAsString() : "Unknown";
                    String photo = playerObj.has("photo") ? playerObj.get("photo").getAsString() : null;
                    PlayerSearchResult r = new PlayerSearchResult(name, position, photo, playerObj);
                    out.add(r);
                }
            }
        } catch (Exception e) { e.printStackTrace(); }
        return out;
    }

    public static class PlayerSearchResult {
        public final String name;
        public final String position;
        public final String photoUrl;
        public final JsonObject raw;
        public PlayerSearchResult(String name, String position, String photoUrl, JsonObject raw) {
            this.name = name; this.position = position; this.photoUrl = photoUrl; this.raw = raw;
        }
        @Override public String toString() { return name + " (" + position + ")"; }
    }

    private static String uriEncode(String s) { return s == null ? "" : s.replace(" ", "%20"); }
}