package com.sss.game;

import com.sss.model.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Random;

public class PlayerManager {

    private LinkedHashMap<String, ForwardPlayer> allForwards;
    private LinkedHashMap<String, MidfielderPlayer> allMidfielders;
    private LinkedHashMap<String, DefenderPlayer> allDefenders;
    private LinkedHashMap<String, GoalkeeperPlayer> allGoalkeepers;

    public PlayerManager() {
        initializePlayers();
    }

    private void initializePlayers() {
        allForwards = new LinkedHashMap<>();
        allMidfielders = new LinkedHashMap<>();
        allDefenders = new LinkedHashMap<>();
        allGoalkeepers = new LinkedHashMap<>();

        // Forwards
        allForwards.put("Messi", new ForwardPlayer("Messi", "Right Winger", 98, 99, 96, 98, 95));
        allForwards.put("Salah", new ForwardPlayer("Salah", "Right Winger", 95, 92, 94, 92, 94));
        allForwards.put("Bale", new ForwardPlayer("Bale", "Right Winger", 93, 93, 98, 93, 92));
        allForwards.put("Yamal", new ForwardPlayer("Yamal", "Right Winger", 87, 96, 93, 96, 93));
        allForwards.put("Suarez", new ForwardPlayer("Suarez", "Striker", 98, 94, 93, 95, 97));
        allForwards.put("Benzema", new ForwardPlayer("Benzema", "Striker", 95, 92, 94, 94, 96));
        allForwards.put("Lewandowski", new ForwardPlayer("Lewandowski", "Striker", 98, 92, 94, 94, 98));
        allForwards.put("Haaland", new ForwardPlayer("Haaland", "Striker", 97, 91, 94, 89, 97));
        allForwards.put("Ronaldo", new ForwardPlayer("Ronaldo", "Left Winger", 99, 97, 97, 95, 98));
        allForwards.put("Neymar", new ForwardPlayer("Neymar", "Left Winger", 93, 99, 96, 98, 94));
        allForwards.put("Ronaldinho", new ForwardPlayer("Ronaldinho", "Left Winger", 93, 98, 95, 94, 90));
        allForwards.put("Mbappe", new ForwardPlayer("Mbappe", "Left Winger", 96, 96, 98, 92, 94));

        // Midfielders
        allMidfielders.put("Zidane", new MidfielderPlayer("Zidane", "Attacking Midfielder", 95, 96, 95, 65, 92));
        allMidfielders.put("Maradona", new MidfielderPlayer("Maradona", "Attacking Midfielder", 93, 99, 93, 65, 93));
        allMidfielders.put("De Bruyne", new MidfielderPlayer("Kevin De Bruyne", "Attacking Midfielder", 97, 94, 96, 70, 91));
        allMidfielders.put("Bellingham", new MidfielderPlayer("Jude Bellingham", "Attacking Midfielder", 93, 94, 93, 90, 95));
        allMidfielders.put("Iniesta", new MidfielderPlayer("Andres Iniesta", "Central Midfielder", 97, 98, 96, 78, 93));
        allMidfielders.put("Xavi", new MidfielderPlayer("Xavi Hernandez", "Central Midfielder", 99, 97, 97, 80, 93));
        allMidfielders.put("Modric", new MidfielderPlayer("Luka Modric", "Central Midfielder", 97, 95, 97, 80, 94));
        allMidfielders.put("Kroos", new MidfielderPlayer("Toni Kroos", "Central Midfielder", 98, 94, 96, 78, 93));
        allMidfielders.put("Busquets", new MidfielderPlayer("Sergio Busquets", "Defensive Midfielder", 97, 93, 94, 96, 94));
        allMidfielders.put("Rodri", new MidfielderPlayer("Rodri", "Defensive Midfielder", 95, 93, 94, 97, 95));
        allMidfielders.put("Pedri", new MidfielderPlayer("Pedri", "Defensive Midfielder", 98, 98, 97, 94, 95));
        allMidfielders.put("Valverde", new MidfielderPlayer("Federico Valverde", "Defensive Midfielder", 95, 96, 94, 96, 98));

        // Defenders
        allDefenders.put("Alba", new DefenderPlayer("Alba", "Left back", 88, 93, 95, 96, 86));
        allDefenders.put("Maldini", new DefenderPlayer("Maldini", "Left back", 98, 97, 90, 93, 96));
        allDefenders.put("Marcelo", new DefenderPlayer("Marcelo", "Left back", 88, 90, 93, 97, 88));
        allDefenders.put("Cancelo", new DefenderPlayer("Joao Cancelo", "Left back", 88, 90, 95, 96, 92));
        allDefenders.put("Pique", new DefenderPlayer("Gerard Pique", "Center back", 98, 96, 94, 98, 95));
        allDefenders.put("Ramos", new DefenderPlayer("Sergio Ramos", "Center back", 98, 95, 96, 93, 98));
        allDefenders.put("Puyol", new DefenderPlayer("Carles Puyol", "Center back", 94, 93, 88, 92, 98));
        allDefenders.put("Van Dijk", new DefenderPlayer("Virgil Van Dijk", "Center back", 97, 96, 92, 94, 97));
        allDefenders.put("Araujo", new DefenderPlayer("Ronaldo Araujo", "Center back", 94, 93, 95, 88, 95));
        allDefenders.put("Alves", new DefenderPlayer("Dani Alves", "Right back", 88, 91, 95, 97, 90));
        allDefenders.put("Carvajal", new DefenderPlayer("Dani Carvajal", "Right back", 89, 89, 91, 94, 88));
        allDefenders.put("Trent", new DefenderPlayer("Trent Alexander-Arnold", "Right back", 82, 86, 95, 97, 91));
        allDefenders.put("Kounde", new DefenderPlayer("Jules Kounde", "Right back", 89, 88, 90, 95, 93));

        // Goalkeepers
        allGoalkeepers.put("Neuer", new GoalkeeperPlayer("Manuel Neuer", "Goalkeeper", 95, 92, 94, 91, 96));
        allGoalkeepers.put("Buffon", new GoalkeeperPlayer("Gianluigi Buffon", "Goalkeeper", 94, 90, 96, 95, 88));
        allGoalkeepers.put("Casillas", new GoalkeeperPlayer("Iker Casillas", "Goalkeeper", 92, 95, 90, 90, 87));
        allGoalkeepers.put("Ter-Stegen", new GoalkeeperPlayer("Marc Andre Ter-Stegen", "Goalkeeper", 93, 91, 94, 92, 97));
    }

    public List<Player> getAllPlayers() {
        List<Player> allPlayers = new ArrayList<>();
        allPlayers.addAll(allForwards.values());
        allPlayers.addAll(allMidfielders.values());
        allPlayers.addAll(allDefenders.values());
        allPlayers.addAll(allGoalkeepers.values());
        return allPlayers;
    }

    public Team generateAITeam(List<String> userPlayerNames) {
        Team aiTeam = new Team();
        Random random = new Random();

        // Filter out players already selected by the user
        LinkedHashMap<String, ForwardPlayer> availableForwards = new LinkedHashMap<>(allForwards);
        LinkedHashMap<String, MidfielderPlayer> availableMidfielders = new LinkedHashMap<>(allMidfielders);
        LinkedHashMap<String, DefenderPlayer> availableDefenders = new LinkedHashMap<>(allDefenders);
        LinkedHashMap<String, GoalkeeperPlayer> availableGoalkeepers = new LinkedHashMap<>(allGoalkeepers);

        userPlayerNames.forEach(name -> {
            availableForwards.remove(name);
            availableMidfielders.remove(name);
            availableDefenders.remove(name);
            availableGoalkeepers.remove(name);
        });

        // Select 3 Forwards for AI
        List<ForwardPlayer> tempForwards = new ArrayList<>(availableForwards.values());
        Collections.shuffle(tempForwards, random);
        for (int i = 0; i < 3 && i < tempForwards.size(); i++) {
            aiTeam.addPlayer(tempForwards.get(i));
        }

        // Select 3 Midfielders for AI
        List<MidfielderPlayer> tempMidfielders = new ArrayList<>(availableMidfielders.values());
        Collections.shuffle(tempMidfielders, random);
        for (int i = 0; i < 3 && i < tempMidfielders.size(); i++) {
            aiTeam.addPlayer(tempMidfielders.get(i));
        }

        // Select 4 Defenders for AI
        List<DefenderPlayer> tempDefenders = new ArrayList<>(availableDefenders.values());
        Collections.shuffle(tempDefenders, random);
        for (int i = 0; i < 4 && i < tempDefenders.size(); i++) {
            aiTeam.addPlayer(tempDefenders.get(i));
        }

        // Select 1 Goalkeeper for AI
        List<GoalkeeperPlayer> tempGoalkeepers = new ArrayList<>(availableGoalkeepers.values());
        Collections.shuffle(tempGoalkeepers, random);
        for (int i = 0; i < 1 && i < tempGoalkeepers.size(); i++) {
            aiTeam.addPlayer(tempGoalkeepers.get(i));
        }

        return aiTeam;
    }

    public Player getPlayerByName(String name) {
        if (allForwards.containsKey(name)) return allForwards.get(name);
        if (allMidfielders.containsKey(name)) return allMidfielders.get(name);
        if (allDefenders.containsKey(name)) return allDefenders.get(name);
        if (allGoalkeepers.containsKey(name)) return allGoalkeepers.get(name);
        return null;
    }
}
