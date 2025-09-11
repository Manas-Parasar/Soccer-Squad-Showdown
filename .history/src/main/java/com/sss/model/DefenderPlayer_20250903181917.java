package com.sss.model;

public class DefenderPlayer extends Player {
    public int tackling, interceptions, pace, ball_playing, strength;

    public DefenderPlayer(String name, String position, int tackling, int interceptions,
                          int pace, int ball_playing, int strength, String imageFile) {
        super(name, position, imageFile);
        this.tackling = tackling;
        this.interceptions = interceptions;
        this.pace = pace;
        this.ball_playing = ball_playing;
        this.strength = strength;
    }

    @Override
    public double contribution() {
        return (tackling*3 + interceptions*2.5 + pace*2 + ball_playing*2 + strength*2.5);
    }
}