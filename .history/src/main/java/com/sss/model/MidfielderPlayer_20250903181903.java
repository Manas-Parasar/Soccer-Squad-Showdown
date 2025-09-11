package com.sss.model;

public class MidfielderPlayer extends Player {
    public int passing, dribbling, vision, defending, stamina;

    public MidfielderPlayer(String name, String position, int passing, int dribbling,
                            int vision, int defending, int stamina, String imageFile) {
        super(name, position, imageFile);
        this.passing = passing;
        this.dribbling = dribbling;
        this.vision = vision;
        this.defending = defending;
        this.stamina = stamina;
    }

    @Override
    public double contribution() {
        return (passing*3 + dribbling*2.5 + vision*2.5 + defending*2 + stamina*2);
    }
}