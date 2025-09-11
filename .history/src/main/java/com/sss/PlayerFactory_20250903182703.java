package com.sss;

import com.google.gson.JsonObject;
import com.sss.model.*;

public class PlayerFactory {

    /**
     * Convert a provider JSON object into one of your Player subclasses.
     * You must inspect the JSON returned by your chosen API and update this mapping.
     *
     * Example strategy:
     * - Try to extract pace/speed, shooting, passing, defending, handling, etc.
     * - Normalize values to 1..100.
     * - If position contains "Att" or "Forward" -> ForwardPlayer
     * - If "Mid" -> MidfielderPlayer, "Def" -> DefenderPlayer, "Goal" -> GoalkeeperPlayer
     *
     * Return a reasonable default (midfielder) if mapping fails.
     */
    public static com.sss.model.Player fromApiJson(JsonObject raw, String positionHint) {
        try {
            String name = raw.has("name") ? raw.get("name").getAsString() : "API Player";
            String pos = positionHint != null ? positionHint : (raw.has("position") ? raw.get("position").getAsString() : "Midfielder");
            // Example heuristics: attempt to extract numeric attributes
            int shooting = extractInt(raw, "shots", 70);
            int passing  = extractInt(raw, "passes", 75);
            int pace     = extractInt(raw, "pace", 80);
            int dribbling= extractInt(raw, "dribbling", 75);
            int defending = extractInt(raw, "defending", 65);
            int handling = extractInt(raw, "handling", 70);
            int movement = pace;

            String photoFile = ""; // leave empty so UI loads from URL

            if (pos.toLowerCase().contains("att") || pos.toLowerCase().contains("for")) {
                return new ForwardPlayer(name, pos, shooting, dribbling, pace, passing, movement, photoFile);
            } else if (pos.toLowerCase().contains("mid")) {
                return new MidfielderPlayer(name, pos, passing, dribbling, Math.max(60, movement), defending, 75, photoFile);
            } else if (pos.toLowerCase().contains("goal")) {
                return new GoalkeeperPlayer(name, pos, Math.max(70, handling), 80, 75, 75, 72, photoFile);
            } else {
                return new DefenderPlayer(name, pos, Math.max(65, defending), 70, pace, 65, 80, photoFile);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new MidfielderPlayer("API Player", "Midfielder", 75,75,75,70,75,"");
        }
    }

    private static int extractInt(JsonObject raw, String key, int fallback) {
        try {
            if (raw.has(key)) {
                JsonObject obj = raw.getAsJsonObject(key);
                if (obj.has("total")) return obj.get("total").getAsInt();
            }
        } catch (Exception ignore) {}
        return fallback;
    }
}