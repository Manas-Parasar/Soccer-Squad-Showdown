package com.sss;

import com.google.gson.Gson;
import com.sss.api.PlayerSearchResult;

public class PlayerFactory {
    private static final Gson gson = new Gson();

    public static PlayerSearchResult fromJson(String json) {
        return gson.fromJson(json, PlayerSearchResult.class);
    }
}