package com.sss.controller;

import com.sss.App;
import com.sss.Navigation;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.text.Text;
import javafx.util.Duration;
import javafx.animation.ScaleTransition;

public class MainMenuController {

    @FXML private Button startBtn;
    @FXML private Button exitBtn;
    @FXML private Text titleText;

    @FXML
    public void initialize() {
        ScaleTransition st = new ScaleTransition(Duration.seconds(1.2), titleText);
        st.setFromX(0.95); st.setToX(1.05); st.setFromY(0.95); st.setToY(1.05);
        st.setCycleCount(ScaleTransition.INDEFINITE); st.setAutoReverse(true);
        st.play();
    }

    @FXML
    public void onStart() {
        App.navigate(Navigation.PLAYER_SELECT, new PlayerSelectController());
    }

    @FXML
    public void onExit() {
        System.exit(0);
    }
}