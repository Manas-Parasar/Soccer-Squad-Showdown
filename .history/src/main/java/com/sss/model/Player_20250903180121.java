package com.sss.model;

public abstract class Player {
    protected String name;
    protected String position;
    protected String imageFile; // filename in resources/images/players/

    public Player(String name, String position, String imageFile) {
        this.name = name;
        this.position = position;
        this.imageFile = imageFile;
    }

    public String getName() { return name; }
    public String getPosition() { return position; }

    public String getImagePath() {
        if (imageFile == null || imageFile.isBlank()) return "/images/default.png";
        return "/images/players/" + imageFile;
    }

    // returns weighted scalar contribution for team strength
    public abstract double contribution();
}