package com.sss.model;

public class GoalkeeperPlayer extends Player {
    public int shot_stopping, reflexes, positioning, handling, distribution;

    public GoalkeeperPlayer (String name, String position, int shot_stopping, int reflexes,
                            int positioning, int handling, int distribution, String imageFile) {
        super(name, position, imageFile);
        this.shot_stopping = shot_stopping;
        this.reflexes = reflexes;
        this.positioning = positioning;
        this.handling = handling;
        this.distribution = distribution;
    }

    @Override
    public double contribution() {
        return (shot_stopping*3 + reflexes*2.5 + positioning*2 + handling*2.5 + distribution*2.5);
    }
}