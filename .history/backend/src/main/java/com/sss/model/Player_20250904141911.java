package com.sss.model;

/**
 * Simple Player model used by the backend and serialized to JSON for the frontend.
 */
public class Player {
    private String name;
    private String position;
    private String team;
    private String image; // relative path or URL to player image

    // No-arg constructor required for Gson / Jackson deserialization
    public Player() {}

    public Player(String name, String position, String team, String image) {
        this.name = name;
        this.position = position;
        this.team = team;
        this.image = image;
    }

    // Getters and setters (Gson will use these)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    @Override
    public String toString() {
        return "Player{" +
                "name='" + name + '\'' +
                ", position='" + position + '\'' +
                ", team='" + team + '\'' +
                ", image='" + image + '\'' +
                '}';
    }
}