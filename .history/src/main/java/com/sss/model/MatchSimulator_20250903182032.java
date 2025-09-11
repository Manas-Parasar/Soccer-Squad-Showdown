package com.sss.model;

import java.util.*;
public class MatchSimulator {
    private final Random rng = new Random();

    public static class Event {
        public final int minute;
        public final String team;
        public final String text;
        public Event(int minute, String team, String text) { this.minute = minute; this.team = team; this.text = text; }
        @Override public String toString(){ return String.format("%02d'  [%s] %s", minute, team, text); }
    }

    public static class Result {
        public int userGoals = 0, aiGoals = 0;
        public double userXG = 0, aiXG = 0;
        public final List<Event> events = new ArrayList<>();
        public String manOfTheMatch = "";
    }

    public Result simulate(Team user, Team ai) {
        Result res = new Result();
        double sUser = user.totalStrength();
        double sAI = ai.totalStrength();

        double base = 1.4;
        double diff = (sUser - sAI);
        double userLambda = Math.max(0.4, base + diff * 0.9);
        double aiLambda   = Math.max(0.4, base - diff * 0.9);

        int userGoals = poisson(userLambda);
        int aiGoals = poisson(aiLambda);

        int userShots = Math.max(3, (int)Math.round(userLambda * 6 + rng.nextInt(4)));
        int aiShots   = Math.max(3, (int)Math.round(aiLambda * 6 + rng.nextInt(4)));

        Set<Integer> usedMinutes = new HashSet<>();
        List<Integer> userGoalMins = randomDistinctMinutes(userGoals, usedMinutes);
        List<Integer> aiGoalMins   = randomDistinctMinutes(aiGoals, usedMinutes);

        for (int i = 0; i < userShots; i++) {
            int m = randomMinute(usedMinutes);
            double xg = clamp(norm(rng)*0.4 + 0.1, 0.02, 0.8);
            res.userXG += xg;
            if (userGoalMins.contains(m)) {
                res.events.add(new Event(m, "User", goalText(randomUserScorer(user))));
            } else {
                res.events.add(new Event(m, "User", shotText(xg)));
            }
        }
        for (int i = 0; i < aiShots; i++) {
            int m = randomMinute(usedMinutes);
            double xg = clamp(norm(rng)*0.4 + 0.1, 0.02, 0.8);
            res.aiXG += xg;
            if (aiGoalMins.contains(m)) {
                res.events.add(new Event(m, "AI", goalText(randomAIScorer(ai))));
            } else {
                res.events.add(new Event(m, "AI", shotText(xg)));
            }
        }

        for (int i=0;i<rng.nextInt(4);i++) {
            int m = randomMinute(usedMinutes);
            res.events.add(new Event(m, rng.nextBoolean()?"User":"AI", rng.nextBoolean()?"Yellow card.":"Foul committed."));
        }

        res.events.sort(Comparator.comparingInt(e -> e.minute));

        res.userGoals = userGoals;
        res.aiGoals = aiGoals;
        res.manOfTheMatch = pickMOM(user, ai, userGoals, aiGoals);

        return res;
    }

    private String pickMOM(Team u, Team a, int ug, int ag) {
        if (ug > ag) {
            return u.forwards.stream().max(Comparator.comparingDouble(ForwardPlayer::contribution))
                    .map(p->"User: "+p.name).orElse("User: Star Midfielder");
        } else if (ag > ug) {
            return a.forwards.stream().max(Comparator.comparingDouble(ForwardPlayer::contribution))
                    .map(p->"AI: "+p.name).orElse("AI: Star Midfielder");
        } else {
            return rng.nextBoolean() ?
                    (u.goalkeepers.isEmpty()? "User: GK" : "User: " + u.goalkeepers.get(0).name) :
                    (a.goalkeepers.isEmpty()? "AI: GK" : "AI: " + a.goalkeepers.get(0).name);
        }
    }

    private static String goalText(String scorer){ return "GOAL! " + scorer + " finds the net!"; }
    private static String shotText(double xg){
        if (xg > 0.5) return "Huge chance! Denied at the last second.";
        if (xg > 0.25) return "Dangerous shot from inside the box!";
        return "Hopeful effort from distance.";
    }

    private String randomUserScorer(Team t){
        if (!t.forwards.isEmpty()) return t.forwards.get(rng.nextInt(t.forwards.size())).name;
        if (!t.midfielders.isEmpty()) return t.midfielders.get(rng.nextInt(t.midfielders.size())).name;
        return "Unknown";
    }
    private String randomAIScorer(Team t){
        if (!t.forwards.isEmpty()) return t.forwards.get(rng.nextInt(t.forwards.size())).name;
        if (!t.midfielders.isEmpty()) return t.midfielders.get(rng.nextInt(t.midfielders.size())).name;
        return "Unknown";
    }

    private int poisson(double lambda){
        double L = Math.exp(-lambda);
        int k = 0; double p = 1.0;
        do { k++; p *= rng.nextDouble(); } while (p > L);
        return k - 1;
    }

    private int randomMinute(Set<Integer> used){
        int m;
        do { m = 1 + rng.nextInt(90); } while (used.contains(m));
        used.add(m);
        return m;
    }

    private List<Integer> randomDistinctMinutes(int count, Set<Integer> used){
        List<Integer> mins = new ArrayList<>();
        for (int i=0;i<count;i++) mins.add(randomMinute(used));
        return mins;
    }

    private static double norm(Random r){ double v = 0.5 + r.nextGaussian()*0.15; return clamp(v, 0.0, 1.0); }
    private static double clamp(double v, double lo, double hi){ return Math.max(lo, Math.min(hi, v)); }
}