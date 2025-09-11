package com.sss.model;

public class ForwardPlayer extends Player {
    private int shooting;
    private int dribbling;
    private int speed;
    private int playmaking;
    private int movement;

    public ForwardPlayer(String name, String position, int shooting, int dribbling, int speed, int playmaking, int movement) {
        super(name, position);
        this.shooting = shooting;
        this.dribbling = dribbling;
        this.speed = speed;
        this.playmaking = playmaking;
        this.movement = movement;
    }

    public int getShooting() {
        return shooting;
    }

    public int getDribbling() {
        return dribbling;
    }

    public int getSpeed() {
        return speed;
    }

    public int getPlaymaking() {
        return playmaking;
    }

    public int getMovement() {
        return movement;
    }

    @Override
    public String getStatsSummary() {
        return "Shooting: " + shooting + " | Dribbling: " + dribbling + " | Speed: " + speed + " | Playmaking: " + playmaking + " | Movement: " + movement;
    }
}
