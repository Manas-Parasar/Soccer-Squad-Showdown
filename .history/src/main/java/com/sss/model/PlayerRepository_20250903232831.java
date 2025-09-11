package com.sss.model;

import java.util.ArrayList;
import java.util.List;

public class PlayerRepository {
    private List<Player> allPlayers = new ArrayList<>();

    public void addPlayer(Player p) { allPlayers.add(p); }
    public List<Player> getAllPlayers() { return allPlayers; }
}