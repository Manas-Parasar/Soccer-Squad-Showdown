package com.sss.model;

public class ForwardPlayer extends Player {
    public ForwardPlayer(String id, String name, String position, String team) {
        super(id, name, position, team);
    }

    @Override
    public int getSkill() {
        return 90; // placeholder
    }
}