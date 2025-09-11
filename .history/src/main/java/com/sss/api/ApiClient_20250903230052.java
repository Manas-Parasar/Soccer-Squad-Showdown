package com.sss.api;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class ApiClient {
    private static final String API_KEY = "YOUR_API_KEY"; // put your AllSportsAPI key here
    private static final String BASE_URL = "https://apiv2.allsportsapi.com/football/";

    private final HttpClient client;

    public ApiClient() {
        this.client = HttpClient.newHttpClient();
    }

    public String getLeagues() throws IOException, InterruptedException {
        String url = BASE_URL + "?met=Leagues&APIkey=" + API_KEY;
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        return response.body();
    }

    public String getPlayers(int leagueId, String season) throws IOException, InterruptedException {
        String url = BASE_URL + "?met=Players&leagueId=" + leagueId + "&season=" + season + "&APIkey=" + API_KEY;
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        return response.body();
    }
}