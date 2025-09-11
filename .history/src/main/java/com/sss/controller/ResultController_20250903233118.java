package com.sss.controller;

import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.stage.Stage;
import com.sss.Navigation;

import java.io.IOException;

public class ResultController {

    @FXML
    private Button btnBackToMenu;

    @FXML
    private void handleBackToMenu() throws IOException {
        Stage stage = (Stage) btnBackToMenu.getScene().getWindow();
        Navigation.goTo(stage, "/com/sss/view/MainMenu.fxml", "Soccer Squad Showdown");
    }
}