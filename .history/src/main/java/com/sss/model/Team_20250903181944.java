package com.sss.model;

import java.util.ArrayList;
import java.util.List;

public class Team {
    public final List<ForwardPlayer> forwards = new ArrayList<>();
    public final List<MidfielderPlayer> midfielders = new ArrayList<>();
    public final List<DefenderPlayer> defenders = new ArrayList<>();
    public final List<GoalkeeperPlayer> goalkeepers = new ArrayList<>();

    public double totalStrength() {
        double f = forwards.stream().mapToDouble(ForwardPlayer::contribution).sum();
        double m = midfielders.stream().mapToDouble(MidfielderPlayer::contribution).sum();
        double d = defenders.stream().mapToDouble(DefenderPlayer::contribution).sum();
        double g = goalkeepers.stream().mapToDouble(GoalkeeperPlayer::contribution).sum();
        return (f + m + d + g) / 132.0;
    }
}