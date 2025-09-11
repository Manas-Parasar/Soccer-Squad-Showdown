package com.sss.model;

public class GoalkeeperPlayer extends Player {
    private int shot_stopping;
    private int reflexes;
    private int positioning;
    private int handling;
    private int distribution;

    public GoalkeeperPlayer(String name, String position, int shot_stopping, int reflexes, int positioning, int handling, int distribution) {
        super(name, position);
        this.shot_stopping = shot_stopping;
        this.reflexes = reflexes;
        this.positioning = positioning;
        this.handling = handling;
        this.distribution = distribution;
    }

    public int getShot_stopping() {
        return shot_stopping;
    }

    public int getReflexes() {
        return reflexes;
    }

    public int getPositioning() {
        return positioning;
    }

    public int getHandling() {
        return handling;
    }

    public int getDistribution() {
        return distribution;
    }

    @Override
    public String getStatsSummary() {
        return "Shot Stopping: " + shot_stopping + " | Reflexes: " + reflexes + " | Positioning: " + positioning + " | Handling: " + handling + " | Distribution: " + distribution;
    }
}
