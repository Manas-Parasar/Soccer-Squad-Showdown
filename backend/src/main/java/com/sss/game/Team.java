package com.sss.game;

import com.sss.model.*;
import java.util.LinkedHashMap;
import java.util.Map;

public class Team {
    private LinkedHashMap<String, ForwardPlayer> forwards;
    private LinkedHashMap<String, MidfielderPlayer> midfielders;
    private LinkedHashMap<String, DefenderPlayer> defenders;
    private LinkedHashMap<String, GoalkeeperPlayer> goalkeeper;

    public Team() {
        this.forwards = new LinkedHashMap<>();
        this.midfielders = new LinkedHashMap<>();
        this.defenders = new LinkedHashMap<>();
        this.goalkeeper = new LinkedHashMap<>();
    }

    public void addPlayer(Player player) {
        if (player instanceof ForwardPlayer) {
            forwards.put(player.getName(), (ForwardPlayer) player);
        } else if (player instanceof MidfielderPlayer) {
            midfielders.put(player.getName(), (MidfielderPlayer) player);
        } else if (player instanceof DefenderPlayer) {
            defenders.put(player.getName(), (DefenderPlayer) player);
        } else if (player instanceof GoalkeeperPlayer) {
            goalkeeper.put(player.getName(), (GoalkeeperPlayer) player);
        }
    }

    public LinkedHashMap<String, ForwardPlayer> getForwards() {
        return forwards;
    }

    public LinkedHashMap<String, MidfielderPlayer> getMidfielders() {
        return midfielders;
    }

    public LinkedHashMap<String, DefenderPlayer> getDefenders() {
        return defenders;
    }

    public LinkedHashMap<String, GoalkeeperPlayer> getGoalkeeper() {
        return goalkeeper;
    }

    public double calculateTeamStrength() {
        double totalStrength = 0;
        double forwardStrength = 0;
        double midfielderStrength = 0;
        double defenderStrength = 0;
        double goalkeeperStrength = 0;

        for (ForwardPlayer player : forwards.values()) {
            forwardStrength += (player.getShooting() * 3 + player.getDribbling() * 2.5 + player.getSpeed() * 2 + player.getPlaymaking() * 2.5 + player.getMovement() * 2);
        }
        for (MidfielderPlayer player : midfielders.values()) {
            midfielderStrength += (player.getPassing() * 3 + player.getDribbling() * 2.5 + player.getVision() * 2.5 + player.getDefending() * 2 + player.getStamina() * 2);
        }
        for (DefenderPlayer player : defenders.values()) {
            defenderStrength += (player.getTackling() * 3 + player.getInterceptions() * 2.5 + player.getPace() * 2 + player.getBall_playing() * 2 + player.getStrength() * 2.5);
        }
        for (GoalkeeperPlayer player : goalkeeper.values()) {
            goalkeeperStrength += (player.getShot_stopping() * 3 + player.getReflexes() * 2.5 + player.getPositioning() * 2 + player.getHandling() * 2.5 + player.getDistribution() * 2.5);
        }

        totalStrength = (forwardStrength + midfielderStrength + defenderStrength + goalkeeperStrength) / 132.0; // Normalizing factor from original code
        return Math.round(totalStrength);
    }

    public String getTeamComposition() {
        StringBuilder sb = new StringBuilder();
        sb.append("Forwards: ");
        for (Player p : forwards.values()) sb.append(p.getName()).append(", ");
        sb.append("\nMidfielders: ");
        for (Player p : midfielders.values()) sb.append(p.getName()).append(", ");
        sb.append("\nDefenders: ");
        for (Player p : defenders.values()) sb.append(p.getName()).append(", ");
        sb.append("\nGoalkeeper: ");
        for (Player p : goalkeeper.values()) sb.append(p.getName()).append(", ");
        return sb.toString();
    }
}
