package com.sss.api;

public class PlayerSearchResult {
    private String id;
    private String name;
    private String position;
    private String team;

    public PlayerSearchResult(String id, String name, String position, String team) {
        this.id = id;
        this.name = name;
        this.position = position;
        this.team = team;
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public String getPosition() { return position; }
    public String getTeam() { return team; }

    @Override
    public String toString() {
        return name + " (" + position + ") - " + team;
    }
}