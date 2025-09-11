package com.sss.model;

public class DefenderPlayer extends Player {
    private int tackling;
    private int interceptions;
    private int pace;
    private int ball_playing;
    private int strength;

    public DefenderPlayer(String name, String position, int tackling, int interceptions, int pace, int ball_playing, int strength) {
        super(name, position);
        this.tackling = tackling;
        this.interceptions = interceptions;
        this.pace = pace;
        this.ball_playing = ball_playing;
        this.strength = strength;
    }

    public int getTackling() {
        return tackling;
    }

    public int getInterceptions() {
        return interceptions;
    }

    public int getPace() {
        return pace;
    }

    public int getBall_playing() {
        return ball_playing;
    }

    public int getStrength() {
        return strength;
    }

    @Override
    public String getStatsSummary() {
        return "Tackling: " + tackling + " | Interceptions: " + interceptions + " | Pace: " + pace + " | Ball Playing: " + ball_playing + " | Strength: " + strength;
    }
}
