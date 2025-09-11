package com.sss.model;

public abstract class Player {
    protected String name;
    protected String position;

    public Player(String name, String position) {
        this.name = name;
        this.position = position;
    }

    public String getName() {
        return name;
    }

    public String getPosition() {
        return position;
    }

    // Abstract method to be implemented by subclasses for specific stats
    public abstract String getStatsSummary();
}
