package com.sss.controller;

import com.sss.model.MatchSimulator;
import com.sss.model.Team;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.stage.Stage;
import com.sss.Navigation;

import java.io.IOException;

public class MatchController {

    @FXML
    private Label lblMatchResult;

    @FXML
    private Button btnFinish;

    @FXML
    public void initialize() {
        // demo: simulate match with dummy teams
        Team teamA = new Team("Team A");
        Team teamB = new Team("Team B");
        lblMatchResult.setText(MatchSimulator.simulate(teamA, teamB));
    }

    @FXML
    private void handleFinish() throws IOException {
        Stage stage = (Stage) btnFinish.getScene().getWindow();
        Navigation.goTo(stage, "/com/sss/view/ResultView.fxml", "Match Result");
    }
}