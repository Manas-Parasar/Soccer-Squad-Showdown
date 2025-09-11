package com.sss.controller;

import com.sss.App;
import com.sss.Navigation;
import com.sss.model.*;
import javafx.fxml.FXML;
import javafx.geometry.Insets;
import javafx.scene.chart.BarChart;
import javafx.scene.chart.CategoryAxis;
import javafx.scene.chart.NumberAxis;
import javafx.scene.chart.XYChart;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.*;

import java.util.*;

public class TeamSummaryController {

    @FXML private FlowPane userPane;
    @FXML private FlowPane aiPane;
    @FXML private Label userStrengthLabel;
    @FXML private Label aiStrengthLabel;
    @FXML private BarChart<String, Number> barChart;
    @FXML private Button startMatchBtn;

    private final Team userTeam;
    private final Team aiTeam = new Team();

    public TeamSummaryController(Team userTeam, PlayerRepository repo) {
        this.userTeam = userTeam;

        Set<String> selected = new HashSet<>();
        userTeam.forwards.forEach(p->selected.add(p.getName()));
        userTeam.midfielders.forEach(p->selected.add(p.getName()));
        userTeam.defenders.forEach(p->selected.add(p.getName()));
        userTeam.goalkeepers.forEach(p->selected.add(p.getName()));

        Random r = new Random();
        List<ForwardPlayer> f = new ArrayList<>(repo.forwards.values().stream().filter(p->!selected.contains(p.getName())).toList());
        List<MidfielderPlayer> m = new ArrayList<>(repo.midfielders.values().stream().filter(p->!selected.contains(p.getName())).toList());
        List<DefenderPlayer> d = new ArrayList<>(repo.defenders.values().stream().filter(p->!selected.contains(p.getName())).toList());
        List<GoalkeeperPlayer> g = new ArrayList<>(repo.goalkeepers.values().stream().filter(p->!selected.contains(p.getName())).toList());

        Collections.shuffle(f); Collections.shuffle(m); Collections.shuffle(d); Collections.shuffle(g);
        aiTeam.forwards.addAll(f.subList(0, Math.min(3,f.size())));
        aiTeam.midfielders.addAll(m.subList(0, Math.min(3,m.size())));
        aiTeam.defenders.addAll(d.subList(0, Math.min(4,d.size())));
        if (!g.isEmpty()) aiTeam.goalkeepers.add(g.get(0));
    }

    @FXML
    public void initialize() {
        userPane.setHgap(12); userPane.setVgap(12);
        aiPane.setHgap(12); aiPane.setVgap(12);

        renderTeam(userPane, userTeam);
        renderTeam(aiPane, aiTeam);

        double us = userTeam.totalStrength();
        double as = aiTeam.totalStrength();
        userStrengthLabel.setText(String.format("User Team Strength: %.2f", us));
        aiStrengthLabel.setText(String.format("AI Team Strength: %.2f", as));

        CategoryAxis x = (CategoryAxis) barChart.getXAxis();
        NumberAxis y = (NumberAxis) barChart.getYAxis();
        x.setLabel("Team"); y.setLabel("Strength");

        XYChart.Series<String, Number> series = new XYChart.Series<>();
        series.setName("Strength");
        series.getData().add(new XYChart.Data<>("User", us));
        series.getData().add(new XYChart.Data<>("AI", as));
        barChart.getData().clear();
        barChart.getData().add(series);
    }

    private void renderTeam(FlowPane pane, Team t){
        pane.getChildren().clear();
        List<Player> all = new ArrayList<>();
        all.addAll(t.forwards); all.addAll(t.midfielders); all.addAll(t.defenders); all.addAll(t.goalkeepers);
        for (Player p : all) {
            VBox card = new VBox(6);
            card.getStyleClass().add("card");
            card.setPadding(new Insets(8));
            Image img;
            try { img = new Image(Objects.requireNonNull(getClass().getResourceAsStream(p.getImagePath()))); }
            catch (Exception e){ img = new Image(Objects.requireNonNull(getClass().getResourceAsStream("/images/default.png"))); }
            ImageView iv = new ImageView(img);
            iv.setFitWidth(90); iv.setFitHeight(90); iv.setPreserveRatio(true);
            Label name = new Label(p.getName());
            Label pos = new Label(p.getPosition());
            card.getChildren().addAll(iv, name, pos);
            pane.getChildren().add(card);
        }
    }

    @FXML
    public void onStartMatch(){
        App.navigate(Navigation.MATCH_VIEW, new MatchController(userTeam, aiTeam));
    }
}