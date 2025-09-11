package com.sss.controller;

import com.sss.App;
import com.sss.Navigation;
import com.sss.PlayerFactory;
import com.sss.api.ApiClient;
import com.sss.model.*;
import javafx.fxml.FXML;
import javafx.geometry.Insets;
import javafx.scene.control.*;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.*;

import java.util.*;
import java.util.stream.Collectors;

public class PlayerSelectController {

    @FXML private TabPane tabPane;
    @FXML private Button nextBtn;
    @FXML private Label statusLabel;

    // API UI
    @FXML private TextField searchField;
    @FXML private Button searchBtn;
 @FXML private ListView<ApiClient.SearchResult> searchResultsList;

    private final PlayerRepository repo = new PlayerRepository();
    private final Team userTeam = new Team();

    private final Set<String> selectedNames = new HashSet<>();

    private final ApiClient apiClient = new ApiClient(); // scaffold

    @FXML
    public void initialize() {
        buildTab("Forwards", new ArrayList<>(repo.forwards.values()), 3);
        buildTab("Midfielders", new ArrayList<>(repo.midfielders.values()), 3);
        buildTab("Defenders", new ArrayList<>(repo.defenders.values()), 4);
        buildTab("Goalkeepers", new ArrayList<>(repo.goalkeepers.values()), 1);
        updateStatus();

        // Search results cell rendering
        searchResultsList.setCellFactory(lv -> new ListCell<>() {
 @Override protected void updateItem(ApiClient.SearchResult r, boolean empty) {
                super.updateItem(r, empty);
                if (empty || r == null) { setGraphic(null); return; }
                HBox root = new HBox(8);
                ImageView iv = new ImageView();
                try {
                    Image img = r.photoUrl != null ? new Image(r.photoUrl, true)
                            : new Image(getClass().getResourceAsStream("/images/default.jpg"));
                    iv.setImage(img);
                } catch(Exception e){
                    iv.setImage(new Image(getClass().getResourceAsStream("/images/default.jpg")));
                }
                iv.setFitWidth(70); iv.setFitHeight(70); iv.setPreserveRatio(true);
                VBox info = new VBox(new Label(r.name), new Label(r.position));
                Button addBtn = new Button("Add");
                addBtn.setOnAction(e -> {
                    // YOU: map r.raw -> Player subclass using PlayerFactory (implement this)
                    Player p = PlayerFactory.fromApiJson(r.raw, r.position);
                    boolean added = addPlayerToTeamIfPossible(p);
                    if (added) {
                        addBtn.setDisable(true);
                        updateStatus();
                    } else {
                        // show alert if cannot add
                        Alert a = new Alert(Alert.AlertType.INFORMATION, "Cannot add (position quota filled or unknown).");
                        a.show();
                    }
                });
                Region spacer = new Region();
                HBox.setHgrow(spacer, Priority.ALWAYS);
                root.getChildren().addAll(iv, info, spacer, addBtn);
                setGraphic(root);
            }
        });
    }

    private boolean addPlayerToTeamIfPossible(Player p) {
        if (p instanceof ForwardPlayer fp && userTeam.forwards.size()<3) { userTeam.forwards.add(fp); selectedNames.add(fp.getName()); return true; }
        if (p instanceof MidfielderPlayer mp && userTeam.midfielders.size()<3) { userTeam.midfielders.add(mp); selectedNames.add(mp.getName()); return true; }
        if (p instanceof DefenderPlayer dp && userTeam.defenders.size()<4) { userTeam.defenders.add(dp); selectedNames.add(dp.getName()); return true; }
        if (p instanceof GoalkeeperPlayer gp && userTeam.goalkeepers.size()<1) { userTeam.goalkeepers.add(gp); selectedNames.add(gp.getName()); return true; }
        return false;
    }

    private void buildTab(String name, List<? extends Player> players, int quota) {
        Tab tab = new Tab(name);
        ScrollPane sp = new ScrollPane();
        FlowPane pane = new FlowPane();
        pane.setHgap(16); pane.setVgap(16); pane.setPadding(new Insets(16));
        sp.setFitToWidth(true);
        sp.setContent(pane);
        tab.setContent(sp);
        tabPane.getTabs().add(tab);

        for (Player p : players) {
            VBox card = makePlayerCard(p, quota, name);
            pane.getChildren().add(card);
        }
    }

    private VBox makePlayerCard(Player p, int quota, String group) {
        Image img;
        try { img = new Image(Objects.requireNonNull(getClass().getResourceAsStream(p.getImagePath()))); }
        catch (Exception e){ img = new Image(Objects.requireNonNull(getClass().getResourceAsStream("/images/default.jpg"))); }

        ImageView iv = new ImageView(img);
        iv.setFitWidth(110); iv.setFitHeight(110); iv.setPreserveRatio(true);
        Label name = new Label(p.getName());
        name.getStyleClass().add("player-name");
        Label pos = new Label(p.getPosition());

        Button add = new Button("Add");
        add.getStyleClass().add("accent");
        add.setOnAction(e -> {
            if (!selectedNames.contains(p.getName()) && canAdd(group)) {
                selectedNames.add(p.getName());
                if (p instanceof ForwardPlayer fp) userTeam.forwards.add(fp);
                if (p instanceof MidfielderPlayer mp) userTeam.midfielders.add(mp);
                if (p instanceof DefenderPlayer dp) userTeam.defenders.add(dp);
                if (p instanceof GoalkeeperPlayer gp) userTeam.goalkeepers.add(gp);
                add.setDisable(true);
                updateStatus();
            }
        });

        VBox box = new VBox(6, iv, name, pos, add);
        box.getStyleClass().add("card");
        box.setPadding(new Insets(10));
        return box;
    }

    private boolean canAdd(String group) {
        return switch (group) {
            case "Forwards" -> userTeam.forwards.size() < 3;
            case "Midfielders" -> userTeam.midfielders.size() < 3;
            case "Defenders" -> userTeam.defenders.size() < 4;
            case "Goalkeepers" -> userTeam.goalkeepers.size() < 1;
            default -> false;
        };
    }

    private void updateStatus() {
        statusLabel.setText(String.format(
                "Selected: FWD %d/3  |  MID %d/3  |  DEF %d/4  |  GK %d/1",
                userTeam.forwards.size(), userTeam.midfielders.size(),
                userTeam.defenders.size(), userTeam.goalkeepers.size()));

        boolean ready = userTeam.forwards.size()==3 && userTeam.midfielders.size()==3
                && userTeam.defenders.size()==4 && userTeam.goalkeepers.size()==1;
        nextBtn.setDisable(!ready);
    }

    @FXML
    public void onNext() {
        App.navigate(Navigation.TEAM_SUMMARY, new TeamSummaryController(userTeam, repo));
    }

    // --- API search handler (calls ApiClient.searchPlayers) ---
    @FXML
    public void onSearch() {
        String q = searchField.getText().trim();
        if (q.isEmpty()) return;
        statusLabel.setText("Searching API...");
        apiClient.searchPlayers(q).thenAccept(results -> {
            javafx.application.Platform.runLater(() -> {
                searchResultsList.getItems().clear();
                searchResultsList.getItems().addAll(results);
                statusLabel.setText("API results: " + results.size());
            });
        }).exceptionally(ex -> {
            ex.printStackTrace();
            javafx.application.Platform.runLater(() -> statusLabel.setText("API search failed."));
            return null;
        });
    }
}