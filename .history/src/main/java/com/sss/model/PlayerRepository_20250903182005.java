package com.sss.model;

import java.util.*;

public class PlayerRepository {
    public final Map<String, ForwardPlayer> forwards = new LinkedHashMap<>();
    public final Map<String, MidfielderPlayer> midfielders = new LinkedHashMap<>();
    public final Map<String, DefenderPlayer> defenders = new LinkedHashMap<>();
    public final Map<String, GoalkeeperPlayer> goalkeepers = new LinkedHashMap<>();

    public PlayerRepository() {
        // Forwards
        forwards.put("Messi", new ForwardPlayer("Messi","Right Winger",98,99,97,99,94,"messi.jpg"));
        forwards.put("Salah", new ForwardPlayer("Salah","Right Winger",96,92,94,93,95,"salah.jpg"));
        forwards.put("Bale", new ForwardPlayer("Bale","Right Winger",92,92,98,93,91,"bale.jpg"));
        forwards.put("Yamal", new ForwardPlayer("Yamal","Right Winger",85,95,92,95,91,"yamal.jpg"));
        forwards.put("Suarez", new ForwardPlayer("Suarez","Striker",97,93,90,94,97,"suarez.jpg"));
        forwards.put("Benzema", new ForwardPlayer("Benzema","Striker",95,91,94,93,96,"benzema.jpg"));
        forwards.put("Lewandowski", new ForwardPlayer("Lewandowski","Striker",97,92,94,95,98,"lewandowski.jpg"));
        forwards.put("Haaland", new ForwardPlayer("Haaland","Striker",97,93,95,88,97,"haaland.jpg"));
        forwards.put("Ronaldo", new ForwardPlayer("Ronaldo","Left Winger",99,97,97,93,98,"ronaldo.jpg"));
        forwards.put("Neymar", new ForwardPlayer("Neymar","Left Winger",92,98,96,95,90,"neymar.jpg"));
        forwards.put("Ronaldinho", new ForwardPlayer("Ronaldinho","Left Winger",94,98,95,94,89,"ronaldinho.jpg"));
        forwards.put("Mbappe", new ForwardPlayer("Mbappe","Left Winger",96,96,98,91,94,"mbappe.jpg"));

        // Midfielders
        midfielders.put("Zidane", new MidfielderPlayer("Zidane","Attacking Midfielder",95,96,95,65,92,"zidane.jpg"));
        midfielders.put("Maradona", new MidfielderPlayer("Maradona","Attacking Midfielder",92,99,94,65,93,"maradona.jpg"));
        midfielders.put("Kevin De Bruyne", new MidfielderPlayer("Kevin De Bruyne","Attacking Midfielder",96,93,96,70,89,"debruyne.jpg"));
        midfielders.put("Jude Bellingham", new MidfielderPlayer("Jude Bellingham","Attacking Midfielder",93,95,93,89,96,"bellingham.jpg"));
        midfielders.put("Andres Iniesta", new MidfielderPlayer("Andres Iniesta","Central Midfielder",97,98,96,75,93,"iniesta.jpg"));
        midfielders.put("Xavi Hernandez", new MidfielderPlayer("Xavi Hernandez","Central Midfielder",99,97,97,75,92,"xavi.jpg"));
        midfielders.put("Luka Modric", new MidfielderPlayer("Luka Modric","Central Midfielder",97,96,97,75,92,"modric.jpg"));
        midfielders.put("Toni Kroos", new MidfielderPlayer("Toni Kroos","Central Midfielder",98,95,96,78,93,"kroos.jpg"));
        midfielders.put("Sergio Busquets", new MidfielderPlayer("Sergio Busquets","Defensive Midfielder",97,95,95,96,96,"busquets.jpg"));
        midfielders.put("Rodri", new MidfielderPlayer("Rodri","Defensive Midfielder",95,95,95,97,96,"rodri.jpg"));
        midfielders.put("Pedri", new MidfielderPlayer("Pedri","Defensive Midfielder",97,98,97,96,98,"pedri.jpg"));
        midfielders.put("Federico Valverde", new MidfielderPlayer("Federico Valverde","Defensive Midfielder",96,96,94,97,98,"valverde.jpg"));

        // Defenders
        defenders.put("Alba", new DefenderPlayer("Alba","Left back",88,92,96,95,84,"alba.jpg"));
        defenders.put("Maldini", new DefenderPlayer("Maldini","Left back",98,97,87,93,95,"maldini.jpg"));
        defenders.put("Marcelo", new DefenderPlayer("Marcelo","Left back",88,85,89,96,83,"marcelo.jpg"));
        defenders.put("Joao Cancelo", new DefenderPlayer("Joao Cancelo","Left back",87,90,96,96,91,"cancelo.jpg"));
        defenders.put("Gerard Pique", new DefenderPlayer("Gerard Pique","Center back",98,96,94,99,94,"pique.jpg"));
        defenders.put("Sergio Ramos", new DefenderPlayer("Sergio Ramos","Center back",98,95,96,93,99,"ramos.jpg"));
        defenders.put("Carles Puyol", new DefenderPlayer("Carles Puyol","Center back",95,93,85,90,97,"puyol.jpg"));
        defenders.put("Virgil Van Dijk", new DefenderPlayer("Virgil Van Dijk","Center back",96,94,90,91,98,"vandijk.jpg"));
        defenders.put("Ronaldo Araujo", new DefenderPlayer("Ronaldo Araujo","Center back",95,93,96,91,97,"araujo.jpg"));
        defenders.put("Dani Alves", new DefenderPlayer("Dani Alves","Right back",88,87,93,97,86,"alves.jpg"));
        defenders.put("Dani Carvajal", new DefenderPlayer("Dani Carvajal","Right back",88,87,90,93,85,"carvajal.jpg"));
        defenders.put("Trent Alexander-Arnold", new DefenderPlayer("Trent Alexander-Arnold","Right back",80,84,95,97,90,"trent.jpg"));
        defenders.put("Jules Kounde", new DefenderPlayer("Jules Kounde","Right back",89,88,90,95,93,"kounde.jpg"));

        // Goalkeepers
        goalkeepers.put("Manuel Neuer", new GoalkeeperPlayer("Manuel Neuer","Goalkeeper",95,92,94,91,96,"neuer.jpg"));
        goalkeepers.put("Gianluigi Buffon", new GoalkeeperPlayer("Gianluigi Buffon","Goalkeeper",94,90,96,95,88,"buffon.jpg"));
        goalkeepers.put("Iker Casillas", new GoalkeeperPlayer("Iker Casillas","Goalkeeper",92,95,90,90,87,"casillas.jpg"));
        goalkeepers.put("Marc Andre Ter-Stegen", new GoalkeeperPlayer("Marc Andre Ter-Stegen","Goalkeeper",93,91,94,92,97,"terstegen.jpg"));
    }
}