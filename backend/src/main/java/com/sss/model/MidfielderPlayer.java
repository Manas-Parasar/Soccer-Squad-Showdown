package com.sss.model;

public class MidfielderPlayer extends Player {
    private int passing;
    private int dribbling;
    private int vision;
    private int defending;
    private int stamina;

    public MidfielderPlayer(String name, String position, int passing, int dribbling, int vision, int defending, int stamina) {
        super(name, position);
        this.passing = passing;
        this.dribbling = dribbling;
        this.vision = vision;
        this.defending = defending;
        this.stamina = stamina;
    }

    public int getPassing() {
        return passing;
    }

    public int getDribbling() {
        return dribbling;
    }

    public int getVision() {
        return vision;
    }

    public int getDefending() {
        return defending;
    }

    public int getStamina() {
        return stamina;
    }

    @Override
    public String getStatsSummary() {
        return "Passing: " + passing + " | Dribbling: " + dribbling + " | Vision: " + vision + " | Defending: " + defending + " | Stamina: " + stamina;
    }
}
