package com.sss.game;

import com.sss.model.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

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

        double userStrength = userTeam.calculateTeamStrength();
        double aiStrength = aiTeam.calculateTeamStrength();

        int userGoals = 0;
        int aiGoals = 0;

        // Simulate 90 minutes of play
        for (int minute = 1; minute <= 90; minute += random.nextInt(5) + 1) { // Events every 1-5 minutes
            String event = generateEvent(userStrength, aiStrength);
            playByPlay.append("Minute ").append(minute).append(": ").append(event).append("\n");

            if (event.contains("scores!")) {
                if (event.contains(userTeam.getForwards().values().iterator().next().getName()) || event.contains(userTeam.getMidfielders().values().iterator().next().getName())) { // Simplified check for user team goal
                    userGoals++;
                } else {
                    aiGoals++;
                }
            }
        }

        playByPlay.append("\nMatch End!\n");
        playByPlay.append("Final Score: User Team ").append(userGoals).append(" - ").append(aiGoals).append(" AI Team\n");

        if (userGoals > aiGoals) {
            playByPlay.append("User Team Wins!");
        } else if (userGoals < aiGoals) {
            playByPlay.append("AI Team Wins!");
        } else {
            playByPlay.append("It's a Draw!");
        }

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
