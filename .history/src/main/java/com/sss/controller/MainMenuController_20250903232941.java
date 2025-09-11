package com.sss.controller;

import com.sss.Navigation;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.stage.Stage;

import java.io.IOException;

public class MainMenuController {

    @FXML
    private Button btnStartGame;

    @FXML
    private Button btnExit;

    @FXML
    private void handleStartGame(ActionEvent event) throws IOException {
        Stage stage = (Stage) btnStartGame.getScene().getWindow();
        Navigation.goTo(stage, "/com/sss/view/PlayerSelect.fxml", "Select Players");
    }

    @FXML
    private void handleExit(ActionEvent event) {
        Stage stage = (Stage) btnExit.getScene().getWindow();
        stage.close();
    }
}