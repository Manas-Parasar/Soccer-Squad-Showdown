package com.sss.model;

public abstract class Player {
    protected String id;
    protected String name;
    protected String position;
    protected String team;

    public Player(String id, String name, String position, String team) {
        this.id = id;
        this.name = name;
        this.position = position;
        this.team = team;
    }

    public String getName() { return name; }
    public String getPosition() { return position; }
    public String getTeam() { return team; }

    public abstract int getSkill(); // Example skill metric
}
