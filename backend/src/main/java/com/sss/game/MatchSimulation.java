package com.sss.game;

import com.sss.model.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

public class MatchSimulation {
    private Team userTeam;
    private Team aiTeam;
    private StringBuilder playByPlay;
    private Random random;

    public MatchSimulation(Team userTeam, Team aiTeam) {
        this.userTeam = userTeam;
        this.aiTeam = aiTeam;
        this.playByPlay = new StringBuilder();
        this.random = new Random();
    }

    public String simulateMatch() {
        playByPlay.append("Match Start!\n\n");

        double userStrength = Math.max(1, userTeam.calculateTeamStrength());
        double aiStrength = Math.max(1, aiTeam.calculateTeamStrength());

        // Team-level stats container
        TeamMatchStats userStats = new TeamMatchStats("User Team", userTeam, userStrength);
        TeamMatchStats aiStats = new TeamMatchStats("AI Team", aiTeam, aiStrength);

        // 1) Possession
        int userPossession = samplePossessionPercent(userStrength, aiStrength);
        int aiPossession = 100 - userPossession;
        userStats.possession = userPossession;
        aiStats.possession = aiPossession;

        // 2) Passes (300-700 per team, influenced by possession)
        userStats.totalPasses = sampleInt(300, 700, userPossession / 100.0);
        aiStats.totalPasses = sampleInt(300, 700, aiPossession / 100.0);
        distributePassesToPlayers(userStats);
        distributePassesToPlayers(aiStats);

        // 3) Shots and shots on target (8-20 shots per team)
        userStats.shots = sampleInt(8, 20, userPossession / 100.0 * (userStrength / (userStrength + aiStrength)));
        aiStats.shots = sampleInt(8, 20, aiPossession / 100.0 * (aiStrength / (userStrength + aiStrength)));
        userStats.shotsOnTarget = (int) Math.round(userStats.shots * randDouble(0.30, 0.50));
        aiStats.shotsOnTarget = (int) Math.round(aiStats.shots * randDouble(0.30, 0.50));

        // 4) Tackles (10-30 per team)
        userStats.tackles = sampleInt(10, 30);
        aiStats.tackles = sampleInt(10, 30);
        distributeTackles(userStats);
        distributeTackles(aiStats);

        // 5) Fouls, corners, offsides
        userStats.fouls = sampleInt(5, 20);
        aiStats.fouls = sampleInt(5, 20);
        userStats.corners = sampleInt(3, 10);
        aiStats.corners = sampleInt(3, 10);
        userStats.offsides = sampleInt(0, 6);
        aiStats.offsides = sampleInt(0, 6);

        // 6) Saves will be determined by shots on target against
        // Simulate shot-by-shot to generate goals/saves/events
        List<MatchEvent> events = new ArrayList<>();
        simulateShotsAndMajorEvents(userStats, aiStats, events);

        // 7) Cards (random small chance influenced by tackles and fouls)
        userStats.yellowCards = sampleInt(0, Math.max(1, userStats.fouls / 5));
        aiStats.yellowCards = sampleInt(0, Math.max(1, aiStats.fouls / 5));
        userStats.redCards = sampleInt(0, userStats.yellowCards > 2 ? 1 : 0);
        aiStats.redCards = sampleInt(0, aiStats.yellowCards > 2 ? 1 : 0);

        // 8) Compute player ratings
        computePlayerRatings(userStats);
        computePlayerRatings(aiStats);

        // 9) Build play-by-play from major events (sorted)
        Collections.sort(events, Comparator.comparingInt(e -> e.minute));
        for (MatchEvent e : events) {
            playByPlay.append("Minute ").append(e.minute).append(": ").append(e.description).append("\n");
        }

        // 10) Final score line + summary
        playByPlay.append("\nMatch End!\n");
        playByPlay.append("Final Score: User Team ").append(userStats.goals).append(" - ").append(aiStats.goals).append(" AI Team\n\n");
        playByPlay.append(userStats.getSummary()).append("\n");
        playByPlay.append(aiStats.getSummary()).append("\n");

        // 11) Post match analysis: top performers
        playByPlay.append(getTopPerformersAnalysis(userStats, 3)).append("\n");
        playByPlay.append(getTopPerformersAnalysis(aiStats, 3)).append("\n");

        return playByPlay.toString();
    }

    private String generateEvent(double userStrength, double aiStrength) {
        double totalStrength = userStrength + aiStrength;
        double userChance = userStrength / totalStrength;

        List<String> events = new ArrayList<>();
        events.add("A fierce tackle in midfield.");
        events.add("Possession changes hands.");
        events.add("A long pass goes astray.");
        events.add("A shot goes wide.");
        events.add("The goalkeeper makes a routine save.");

        if (random.nextDouble() < userChance) {
            // User team event
            if (random.nextDouble() < 0.3) { // 30% chance of a scoring opportunity
                Player scorer = getRandomPlayer(userTeam);
                return scorer.getName() + " takes a shot... and scores!";
            } else {
                return "User team attacks! " + events.get(random.nextInt(events.size()));
            }
        } else {
            // AI team event
            if (random.nextDouble() < 0.3) { // 30% chance of a scoring opportunity
                Player scorer = getRandomPlayer(aiTeam);
                return scorer.getName() + " from AI team takes a shot... and scores!";
            } else {
                return "AI team attacks! " + events.get(random.nextInt(events.size()));
            }
        }
    }

    private Player getRandomPlayer(Team team) {
        List<Player> allPlayers = new ArrayList<>();
        allPlayers.addAll(team.getForwards().values());
        allPlayers.addAll(team.getMidfielders().values());
        allPlayers.addAll(team.getDefenders().values());
        allPlayers.addAll(team.getGoalkeeper().values());
        return allPlayers.get(random.nextInt(allPlayers.size()));
    }

    // -------------------- Helpers & simulation internals --------------------

    private static class PlayerMatchStats {
        String name;
        String position;
        int passes = 0;
        int shots = 0;
        int shotsOnTarget = 0;
        int goals = 0;
        int assists = 0;
        int tackles = 0;
        int keyPasses = 0;
        int saves = 0;
        int yellow = 0;
        int red = 0;
        double rating = 5.0;

        PlayerMatchStats(String name, String position) { this.name = name; this.position = position; }
    }

    private static class TeamMatchStats {
        String teamName;
        Team team;
        double strength;
        int possession;
        int totalPasses;
        int shots;
        int shotsOnTarget;
        int tackles;
        int fouls;
        int corners;
        int offsides;
        int yellowCards;
        int redCards;
        int goals = 0;
        Map<String, PlayerMatchStats> playerStats = new HashMap<>();

        TeamMatchStats(String teamName, Team team, double strength) {
            this.teamName = teamName; this.team = team; this.strength = strength;
            // init players
            team.getForwards().values().forEach(p -> playerStats.put(p.getName(), new PlayerMatchStats(p.getName(), "Forward")));
            team.getMidfielders().values().forEach(p -> playerStats.put(p.getName(), new PlayerMatchStats(p.getName(), "Midfielder")));
            team.getDefenders().values().forEach(p -> playerStats.put(p.getName(), new PlayerMatchStats(p.getName(), "Defender")));
            team.getGoalkeeper().values().forEach(p -> playerStats.put(p.getName(), new PlayerMatchStats(p.getName(), "Goalkeeper")));
        }

        String getSummary() {
            StringBuilder sb = new StringBuilder();
            sb.append("[").append(teamName).append("] Possession: ").append(possession).append("% | Shots: ").append(shots).append(" (On Target: ").append(shotsOnTarget).append(") | Passes: ").append(totalPasses);
            sb.append(" | Tackles: ").append(tackles).append(" | Saves: ").append(estimateSaves()).append(" | Fouls: ").append(fouls).append(" | Corners: ").append(corners).append(" | Offsides: ").append(offsides);
            sb.append(" | Goals: ").append(goals).append(" | YC: ").append(yellowCards).append(" | RC: ").append(redCards);
            return sb.toString();
        }

        int estimateSaves() {
            // Rough approximation: saves = shotsOnTargetAgainst - goals
            return Math.max(0, shotsOnTarget - goals);
        }
    }

    private static class MatchEvent {
        int minute;
        String description;
        MatchEvent(int minute, String description) { this.minute = minute; this.description = description; }
    }

    private int samplePossessionPercent(double userStrength, double aiStrength) {
        double base = userStrength / (userStrength + aiStrength);
        double jitter = randDouble(-0.12, 0.12); // allow swings
        int p = (int) Math.round((base + jitter) * 100);
        p = Math.max(20, Math.min(80, p));
        return p;
    }

    private int sampleInt(int min, int max) { return random.nextInt(max - min + 1) + min; }
    private int sampleInt(int min, int max, double weight) {
        // weight [0..1] biases towards higher side
        int base = sampleInt(min, max);
        int biased = (int) Math.round(min + (base - min) * Math.max(0.1, Math.min(1.0, weight + randDouble(-0.15, 0.15))));
        return Math.max(min, Math.min(max, biased));
    }

    private double randDouble(double a, double b) { return a + random.nextDouble() * (b - a); }

    private void distributePassesToPlayers(TeamMatchStats tstats) {
        // Generate role-ideal passes
        Map<String, Integer> ideal = new HashMap<>();
        int sumIdeal = 0;
        for (Player p : tstats.team.getMidfielders().values()) {
            int v = sampleInt(50, 120);
            ideal.put(p.getName(), v); sumIdeal += v;
        }
        for (Player p : tstats.team.getDefenders().values()) {
            int v = sampleInt(30, 80);
            ideal.put(p.getName(), v); sumIdeal += v;
        }
        for (Player p : tstats.team.getForwards().values()) {
            int v = sampleInt(15, 40);
            ideal.put(p.getName(), v); sumIdeal += v;
        }
        for (Player p : tstats.team.getGoalkeeper().values()) {
            int v = sampleInt(5, 40);
            ideal.put(p.getName(), v); sumIdeal += v;
        }

        double scale = tstats.totalPasses / (double) Math.max(1, sumIdeal);
        for (Map.Entry<String, Integer> e : ideal.entrySet()) {
            int assigned = (int) Math.round(e.getValue() * scale);
            tstats.playerStats.get(e.getKey()).passes = assigned;
        }
    }

    private void distributeTackles(TeamMatchStats tstats) {
        // defenders and midfielders get majority
        List<PlayerMatchStats> mids = tstats.playerStats.values().stream().filter(p -> p.position.equals("Midfielder")).collect(Collectors.toList());
        List<PlayerMatchStats> defs = tstats.playerStats.values().stream().filter(p -> p.position.equals("Defender")).collect(Collectors.toList());
        int remaining = tstats.tackles;
        for (PlayerMatchStats p : defs) {
            int assign = sampleInt(2, Math.max(2, remaining / Math.max(1, defs.size())));
            p.tackles = Math.min(assign, remaining); remaining -= p.tackles;
        }
        for (PlayerMatchStats p : mids) {
            if (remaining <= 0) break;
            int assign = sampleInt(1, Math.max(1, remaining / Math.max(1, mids.size())));
            p.tackles += Math.min(assign, remaining); remaining -= assign;
        }
        // any leftovers go to random players
        List<PlayerMatchStats> all = new ArrayList<>(tstats.playerStats.values());
        while (remaining > 0) {
            PlayerMatchStats p = all.get(random.nextInt(all.size()));
            p.tackles++; remaining--;
        }
    }

    private void simulateShotsAndMajorEvents(TeamMatchStats user, TeamMatchStats ai, List<MatchEvent> events) {
        // allocate shots to players
        allocateShotsToPlayers(user);
        allocateShotsToPlayers(ai);

        // For each shot on target, determine whether it's a goal or a save
        generateShotOutcomeEvents(user, ai, events, true);
        generateShotOutcomeEvents(ai, user, events, true);

        // Add some big chance events (shots off target but clear opportunities)
        addBigChanceEvents(user, ai, events);

        // Add cards and decisive tackles as events
        addDisciplinaryAndTackleEvents(user, events);
        addDisciplinaryAndTackleEvents(ai, events);
    }

    private void allocateShotsToPlayers(TeamMatchStats tstats) {
        // weight forwards highest, then midfielders, then defenders
        List<Player> forwards = new ArrayList<>(tstats.team.getForwards().values());
        List<Player> midfielders = new ArrayList<>(tstats.team.getMidfielders().values());
        List<Player> defenders = new ArrayList<>(tstats.team.getDefenders().values());
        List<Player> gks = new ArrayList<>(tstats.team.getGoalkeeper().values());

        Map<String, Integer> allocated = new HashMap<>();
        int remainingShots = tstats.shots;

        // First assign to forwards
        for (Player p : forwards) {
            int s = sampleInt(3, 8);
            allocated.put(p.getName(), s);
            remainingShots -= s;
        }
        // midfielders
        for (Player p : midfielders) {
            int s = sampleInt(0, 3);
            allocated.put(p.getName(), s);
            remainingShots -= s;
        }
        // defenders
        for (Player p : defenders) {
            int s = sampleInt(0, 1);
            allocated.put(p.getName(), s);
            remainingShots -= s;
        }
        // any leftover shots randomly distributed
        List<String> names = new ArrayList<>(allocated.keySet());
        while (remainingShots > 0 && names.size() > 0) {
            String n = names.get(random.nextInt(names.size()));
            allocated.put(n, allocated.get(n) + 1);
            remainingShots--;
        }

        // assign into playerStats
        for (Map.Entry<String, Integer> e : allocated.entrySet()) {
            PlayerMatchStats pms = tstats.playerStats.get(e.getKey());
            if (pms != null) pms.shots = e.getValue();
        }
        // Shots on target distribution (30-50%) across players with shots
        int sOT = tstats.shotsOnTarget;
        List<PlayerMatchStats> shooters = tstats.playerStats.values().stream().filter(p -> p.shots > 0).collect(Collectors.toList());
        while (sOT > 0 && shooters.size() > 0) {
            PlayerMatchStats p = shooters.get(random.nextInt(shooters.size()));
            if (p.shotsOnTarget < p.shots) { p.shotsOnTarget++; sOT--; }
            else shooters.remove(p);
        }
    }

    private void generateShotOutcomeEvents(TeamMatchStats attacking, TeamMatchStats defending, List<MatchEvent> events, boolean onlyOnTarget) {
        List<PlayerMatchStats> shooters = attacking.playerStats.values().stream().filter(p -> p.shotsOnTarget > 0).collect(Collectors.toList());
        // for each shot on target, determine outcome
        int shotsOnTarget = shooters.stream().mapToInt(p -> p.shotsOnTarget).sum();
        for (int i = 0; i < shotsOnTarget; i++) {
            // pick shooter with available on-target
            PlayerMatchStats shooter = null;
            List<PlayerMatchStats> candidates = shooters.stream().filter(p -> p.shotsOnTarget > 0).collect(Collectors.toList());
            if (candidates.isEmpty()) break;
            shooter = candidates.get(random.nextInt(candidates.size()));
            shooter.shotsOnTarget--;

            // pick goalkeeper for defender team
            GoalkeeperPlayer gk = defending.team.getGoalkeeper().values().stream().findFirst().orElse(null);

            // compute probability of goal based on shooter shooting attribute and GK shot_stopping/reflexes
            double shooterAbility = 50.0; // fallback
            Player modelShooter = findPlayerByName(attacking.team, shooter.name);
            if (modelShooter instanceof ForwardPlayer) {
                ForwardPlayer fp = (ForwardPlayer) modelShooter; shooterAbility = fp.getShooting();
            } else if (modelShooter instanceof MidfielderPlayer) {
                MidfielderPlayer mp = (MidfielderPlayer) modelShooter; shooterAbility = mp.getPassing() * 0.2 + mp.getDribbling() * 0.8;
            } else if (modelShooter instanceof DefenderPlayer) {
                DefenderPlayer dp = (DefenderPlayer) modelShooter; shooterAbility = dp.getPace() * 0.2 + dp.getTackling() * 0.2;
            }

            double gkAbility = 50.0;
            if (gk != null) gkAbility = (gk.getShot_stopping() + gk.getReflexes()) / 2.0;

            double baseGoalProb = 0.12 + (shooterAbility - 50) / 400.0; // range roughly [~0.07..0.17]
            double gkFactor = 1.0 - (gkAbility - 50) / 200.0; // stronger GK reduces chance
            double finalGoalProb = Math.max(0.02, Math.min(0.6, baseGoalProb * gkFactor * randDouble(0.7, 1.3)));

            int minute = sampleEventMinute();
            if (random.nextDouble() < finalGoalProb) {
                // goal
                shooter.goals++;
                attacking.goals++;
                String assist = maybeAddAssist(attacking, shooter);
                String desc = shooter.name + " scores for " + attacking.teamName + "" + (assist != null ? " (assist: " + assist + ")" : "") + "!";
                events.add(new MatchEvent(minute, desc));
            } else {
                // saved
                if (gk != null) {
                    // credit save to goalkeeper
                    PlayerMatchStats gkst = defending.playerStats.get(gk.getName());
                    if (gkst != null) gkst.saves++;
                    String desc = "Big chance! " + shooter.name + "'s shot is brilliantly saved by " + gk.getName() + " for " + defending.teamName + ".";
                    events.add(new MatchEvent(minute, desc));
                } else {
                    String desc = "A shot on target by " + shooter.name + " is narrowly denied.";
                    events.add(new MatchEvent(minute, desc));
                }
            }
        }
    }

    private void addBigChanceEvents(TeamMatchStats user, TeamMatchStats ai, List<MatchEvent> events) {
        // Add a few big chance events for variety (non-scoring)
        int bigChances = sampleInt(1, 5);
        for (int i = 0; i < bigChances; i++) {
            boolean byUser = random.nextBoolean();
            TeamMatchStats t = byUser ? user : ai;
            List<PlayerMatchStats> candidates = t.playerStats.values().stream().filter(p -> p.shots > 0).collect(Collectors.toList());
            if (candidates.isEmpty()) continue;
            PlayerMatchStats p = candidates.get(random.nextInt(candidates.size()));
            int minute = sampleEventMinute();
            events.add(new MatchEvent(minute, "Huge chance for " + p.name + " of " + t.teamName + " — just misses or is saved."));
        }
    }

    private void addDisciplinaryAndTackleEvents(TeamMatchStats t, List<MatchEvent> events) {
        // decisive tackles and cards
        int tacklesToShow = Math.max(1, t.tackles / 10);
        List<PlayerMatchStats> defendersAndMids = t.playerStats.values().stream().filter(p -> p.position.equals("Defender") || p.position.equals("Midfielder")).collect(Collectors.toList());
        for (int i = 0; i < tacklesToShow; i++) {
            if (defendersAndMids.isEmpty()) break;
            PlayerMatchStats p = defendersAndMids.get(random.nextInt(defendersAndMids.size()));
            int minute = sampleEventMinute();
            events.add(new MatchEvent(minute, p.name + " makes a decisive tackle for " + t.teamName + "."));
        }
        // cards
        for (int yc = 0; yc < t.yellowCards; yc++) {
            PlayerMatchStats p = t.playerStats.values().stream().skip(random.nextInt(Math.max(1, t.playerStats.size()))).findFirst().orElse(null);
            if (p == null) continue;
            int minute = sampleEventMinute(); p.yellow++;
            events.add(new MatchEvent(minute, p.name + " is booked (Yellow Card) for " + t.teamName + "."));
        }
    }

    private int sampleEventMinute() { return sampleInt(1, 90); }

    private String maybeAddAssist(TeamMatchStats tstats, PlayerMatchStats scorer) {
        // choose a teammate with decent passes as potential assister
        List<PlayerMatchStats> candidates = tstats.playerStats.values().stream().filter(p -> !p.name.equals(scorer.name) && p.passes > 20).collect(Collectors.toList());
        if (candidates.isEmpty() || random.nextDouble() > 0.6) return null;
        PlayerMatchStats assister = candidates.get(random.nextInt(candidates.size()));
        assister.assists++; assister.keyPasses++;
        return assister.name;
    }

    private Player findPlayerByName(Team team, String name) {
        if (team.getForwards().containsKey(name)) return team.getForwards().get(name);
        if (team.getMidfielders().containsKey(name)) return team.getMidfielders().get(name);
        if (team.getDefenders().containsKey(name)) return team.getDefenders().get(name);
        if (team.getGoalkeeper().containsKey(name)) return team.getGoalkeeper().get(name);
        return null;
    }

    private void computePlayerRatings(TeamMatchStats tstats) {
        for (Map.Entry<String, PlayerMatchStats> e : tstats.playerStats.entrySet()) {
            PlayerMatchStats s = e.getValue();
            Player model = findPlayerByName(tstats.team, s.name);
            double base = 5.0;
            if (model instanceof ForwardPlayer) {
                ForwardPlayer p = (ForwardPlayer) model;
                base = (p.getShooting() + p.getDribbling() + p.getSpeed() + p.getPlaymaking() + p.getMovement()) / 50.0; // avg/10
            } else if (model instanceof MidfielderPlayer) {
                MidfielderPlayer p = (MidfielderPlayer) model;
                base = (p.getPassing() + p.getDribbling() + p.getVision() + p.getDefending() + p.getStamina()) / 50.0;
            } else if (model instanceof DefenderPlayer) {
                DefenderPlayer p = (DefenderPlayer) model;
                base = (p.getTackling() + p.getInterceptions() + p.getPace() + p.getBall_playing() + p.getStrength()) / 50.0;
            } else if (model instanceof GoalkeeperPlayer) {
                GoalkeeperPlayer p = (GoalkeeperPlayer) model;
                base = (p.getShot_stopping() + p.getReflexes() + p.getPositioning() + p.getHandling() + p.getDistribution()) / 50.0;
            }
            double rating = base;
            rating += s.goals * 0.8;
            rating += s.assists * 0.6;
            rating += Math.min(2.0, s.passes / 200.0);
            rating += Math.min(1.5, s.tackles / 10.0);
            rating += Math.min(1.5, s.saves / 5.0);
            // small randomness
            rating += randDouble(-0.4, 0.6);
            rating = Math.max(1.0, Math.min(10.0, rating));
            s.rating = Math.round(rating * 10.0) / 10.0;
        }
    }

    private String getTopPerformersAnalysis(TeamMatchStats tstats, int topN) {
        List<PlayerMatchStats> sorted = new ArrayList<>(tstats.playerStats.values());
        sorted.sort((a, b) -> Double.compare(b.rating, a.rating));
        StringBuilder sb = new StringBuilder();
        sb.append("--- Top performers for ").append(tstats.teamName).append(" ---\n");
        for (int i = 0; i < Math.min(topN, sorted.size()); i++) {
            PlayerMatchStats p = sorted.get(i);
            sb.append(i + 1).append(". ").append(p.name).append(" (Rating: ").append(p.rating).append(") - ");
            sb.append("G:").append(p.goals).append(" A:").append(p.assists).append(" P:").append(p.passes).append(" S:").append(p.shots).append(" T:").append(p.tackles).append("\n");
        }
        return sb.toString();
    }

    public String getTeamChemistryAnalysis() {
        // Simple chemistry based on overall team strength and cohesion
        double userStrength = userTeam.calculateTeamStrength();
        double aiStrength = aiTeam.calculateTeamStrength();

        StringBuilder chemistryAnalysis = new StringBuilder();
        chemistryAnalysis.append("\n--- Team Chemistry Analysis ---\n");
        chemistryAnalysis.append("User Team Chemistry: ");
        if (userStrength > 80) {
            chemistryAnalysis.append("Excellent! Players are gelling well.");
        } else if (userStrength > 60) {
            chemistryAnalysis.append("Good. Room for improvement but solid.");
        } else {
            chemistryAnalysis.append("Developing. Players need more time to connect.");
        }
        chemistryAnalysis.append("\nAI Team Chemistry: ");
        if (aiStrength > 80) {
            chemistryAnalysis.append("Excellent! AI players are in sync.");
        } else if (aiStrength > 60) {
            chemistryAnalysis.append("Good. AI team shows cohesion.");
        } else {
            chemistryAnalysis.append("Developing. AI players are still finding their rhythm.");
        }
        return chemistryAnalysis.toString();
    }

    public String getPostMatchAnalysis() {
        StringBuilder analysis = new StringBuilder();
        analysis.append("\n--- Post-Match Analysis ---\n");
        analysis.append("Key Takeaways:\n");
        analysis.append("- User Team Strength: ").append(userTeam.calculateTeamStrength()).append("\n");
        analysis.append("- AI Team Strength: ").append(aiTeam.calculateTeamStrength()).append("\n");
        analysis.append("\nTop Performers (Simplified):\n");
        analysis.append("- User Team: ").append(getRandomPlayer(userTeam).getName()).append(" (Key contributions)").append("\n");
        analysis.append("- AI Team: ").append(getRandomPlayer(aiTeam).getName()).append(" (Strong performance)").append("\n");
        analysis.append("\nMatch Flow:\n");
        analysis.append("The match was a dynamic encounter with both teams creating opportunities. The final score reflects the competitive nature of the game.");
        return analysis.toString();
    }
}
