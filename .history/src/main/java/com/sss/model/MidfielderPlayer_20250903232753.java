package com.sss.model;

public class MidfielderPlayer extends Player {
    public MidfielderPlayer(String id, String name, String position, String team) {
        super(id, name, position, team);
    }

    @Override
    public int getSkill() {
        return 85;
    }
}