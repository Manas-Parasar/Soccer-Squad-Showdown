package com.sss.model;

public class Player {
    private String name;
    private String position;
    private String image;

    public Player(String name, String position, String image) {
        this.name = name;
        this.position = position;
        this.image = image;
    }

    public String getName() { return name; }
    public String getPosition() { return position; }
    public String getImage() { return image; }
}