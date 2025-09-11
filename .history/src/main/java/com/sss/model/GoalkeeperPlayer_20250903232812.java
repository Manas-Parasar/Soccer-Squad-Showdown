package com.sss.model;

public class GoalkeeperPlayer extends Player {
    public GoalkeeperPlayer(String id, String name, String position, String team) {
        super(id, name, position, team);
    }

    @Override
    public int getSkill() {
        return 88;
    }
}