package com.sss.controller;

import com.sss.App;
import com.sss.Navigation;
import com.sss.model.MatchSimulator;
import com.sss.model.Team;
import javafx.animation.KeyFrame;
import javafx.animation.Timeline;
import javafx.fxml.FXML;
import javafx.scene.control.*;
import javafx.scene.text.Text;
import javafx.util.Duration;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

public class MatchController {

    @FXML private Label userScoreLabel;
    @FXML private Label aiScoreLabel;
    @FXML private Label minuteLabel;
    @FXML private ListView<String> eventList;
    @FXML private ProgressBar matchProgress;
    @FXML private Text vsText;

    private final Team userTeam, aiTeam;

    private MatchSimulator.Result result;

    public MatchController(Team userTeam, Team aiTeam) {
        this.userTeam = userTeam;
        this.aiTeam = aiTeam;
    }

    @FXML
    public void initialize() {
        MatchSimulator sim = new MatchSimulator();
        result = sim.simulate(userTeam, aiTeam);

        AtomicInteger minute = new AtomicInteger(0);
        Timeline tl = new Timeline(new KeyFrame(Duration.millis(100), ev -> {
            int cur = minute.incrementAndGet();
            minuteLabel.setText(cur + "'");
            matchProgress.setProgress(cur / 90.0);
            List<MatchSimulator.Event> todays = result.events.stream().filter(e->e.minute==cur).toList();
            todays.forEach(e -> {
                eventList.getItems().add(e.toString());
                if (e.text.startsWith("GOAL!")) {
                    if ("User".equals(e.team)) {
                        int user = Integer.parseInt(userScoreLabel.getText());
                        userScoreLabel.setText(String.valueOf(user+1));
                    } else {
                        int ai = Integer.parseInt(aiScoreLabel.getText());
                        aiScoreLabel.setText(String.valueOf(ai+1));
                    }
                }
                eventList.scrollTo(eventList.getItems().size()-1);
            });

            if (cur >= 90) {
                tl.stop();
                onFinish();
            }
        }));
        tl.setCycleCount(90);
        userScoreLabel.setText("0");
        aiScoreLabel.setText("0");
        vsText.setText("Kickoff! Good luck! ⚽");
        tl.play();
    }

    private void onFinish() {
        App.navigate(Navigation.RESULT_VIEW,
                new ResultController(
                        Integer.parseInt(userScoreLabel.getText()),
                        Integer.parseInt(aiScoreLabel.getText()),
                        result.userXG, result.aiXG, result.manOfTheMatch, result.events
                ));
    }
}