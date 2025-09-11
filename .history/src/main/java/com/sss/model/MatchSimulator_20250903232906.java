package com.sss.model;

import java.util.Random;

public class MatchSimulator {
    private static Random random = new Random();

    public static String simulate(Team a, Team b) {
        int scoreA = 0;
        int scoreB = 0;
        for (Player p : a.getPlayers()) scoreA += p.getSkill();
        for (Player p : b.getPlayers()) scoreB += p.getSkill();

        scoreA = scoreA / a.getPlayers().size();
        scoreB = scoreB / b.getPlayers().size();

        scoreA += random.nextInt(5);
        scoreB += random.nextInt(5);

        return a.getName() + " " + scoreA + " - " + scoreB + " " + b.getName();
    }
}