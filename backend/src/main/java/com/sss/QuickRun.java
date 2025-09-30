package com.sss;

import com.sss.game.MatchSimulation;
import com.sss.game.PlayerManager;
import com.sss.game.Team;
import com.sss.model.Player;

import java.util.List;

public class QuickRun {
    public static void main(String[] args) {
        PlayerManager pm = new PlayerManager();
        List<Player> all = pm.getAllPlayers();

        // pick first 11 players for user team (simple deterministic selection for test)
        Team userTeam = new Team();
        for (int i = 0; i < 11 && i < all.size(); i++) {
            userTeam.addPlayer(all.get(i));
        }

        Team aiTeam = pm.generateAITeam(all.subList(0, Math.min(11, all.size())).stream().map(Player::getName).toList());

        MatchSimulation sim = new MatchSimulation(userTeam, aiTeam);
        String pbp = sim.simulateMatch();
        System.out.println(pbp);
    }
}
