package com.sss.controller;

import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.ListView;
import javafx.stage.Stage;
import com.sss.Navigation;

import java.io.IOException;

public class TeamSummaryController {

    @FXML
    private ListView<String> lvTeamPlayers;

    @FXML
    private Button btnStartMatch;

    @FXML
    private void handleStartMatch() throws IOException {
        Stage stage = (Stage) btnStartMatch.getScene().getWindow();
        Navigation.goTo(stage, "/com/sss/view/MatchView.fxml", "Match Simulation");
    }
}
