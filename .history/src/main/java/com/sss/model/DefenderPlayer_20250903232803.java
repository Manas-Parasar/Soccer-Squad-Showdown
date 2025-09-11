package com.sss.model;

public class DefenderPlayer extends Player {
    public DefenderPlayer(String id, String name, String position, String team) {
        super(id, name, position, team);
    }

    @Override
    public int getSkill() {
        return 80;
    }
}