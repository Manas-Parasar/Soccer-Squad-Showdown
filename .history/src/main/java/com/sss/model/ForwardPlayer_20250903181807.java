package com.sss.model;

public class ForwardPlayer extends Player {
    public int shooting, dribbling, speed, playmaking, movement;

    public ForwardPlayer(String name, String position, int shooting, int dribbling,
                         int speed, int playmaking, int movement, String imageFile) {
        super(name, position, imageFile);
        this.shooting = shooting;
        this.dribbling = dribbling;
        this.speed = speed;
        this.playmaking = playmaking;
        this.movement = movement;
    }

    @Override
    public double contribution() {
        return (shooting*3 + dribbling*2.5 + speed*2 + playmaking*2.5 + movement*2);
    }
}