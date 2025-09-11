package com.sss.controller;

import com.sss.App;
import com.sss.Navigation;
import com.sss.model.MatchSimulator;
import javafx.fxml.FXML;
import javafx.scene.control.*;
import javafx.scene.text.Text;

import java.util.List;

public class ResultController {
    @FXML private Label finalScore;
    @FXML private Label xgLabel;
    @FXML private Label momLabel;
    @FXML private ListView<String> eventsList;
    @FXML private Button rematchBtn;
    @FXML private Button mainBtn;
    @FXML private Text title;

    private final int u, a;
    private final double uxg, axg;
    private final String mom;
    private final List<MatchSimulator.Event> events;

    public ResultController(int userGoals, int aiGoals, double userXG, double aiXG, String mom, List<MatchSimulator.Event> events) {
        this.u = userGoals; this.a = aiGoals; this.uxg = userXG; this.axg = aiXG; this.mom = mom; this.events = events;
    }

    @FXML
    public void initialize() {
        finalScore.setText("Final: User " + u + " - " + a + " AI");
        xgLabel.setText(String.format("xG: User %.2f | AI %.2f", uxg, axg));
        momLabel.setText("Man of the Match: " + mom);
        events.forEach(e -> eventsList.getItems().add(e.toString()));
        title.setText(u > a ? "YOU WIN! 🎉" : (u < a ? "YOU LOSE 😢" : "DRAW 🤝"));
    }

    @FXML
    public void onRematch() { App.navigate(Navigation.PLAYER_SELECT, new PlayerSelectController()); }

    @FXML
    public void onMainMenu() { App.navigate(Navigation.MAIN_MENU, new MainMenuController()); }
}