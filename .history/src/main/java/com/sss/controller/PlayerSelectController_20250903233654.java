package com.sss.controller;

import com.sss.Navigation;
import com.sss.api.ApiClient;
import com.sss.api.PlayerSearchResult;
import com.sss.model.*;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.*;
import javafx.stage.Stage;

import java.io.IOException;
import java.util.List;

public class PlayerSelectController {

    @FXML
    private TextField txtPlayerSearch;

    @FXML
    private ListView<String> lvSearchResults;

    @FXML
    private Button btnAddToTeam;

    @FXML
    private Button btnNext;

    private ApiClient apiClient = new ApiClient();
    private Team userTeam = new Team("User Team");

    private ObservableList<String> displayedResults = FXCollections.observableArrayList();

    @FXML
    public void initialize() {
        lvSearchResults.setItems(displayedResults);
    }

    @FXML
    private void handleSearch(ActionEvent event) {
        String query = txtPlayerSearch.getText();
        displayedResults.clear();
        if (!query.isBlank()) {
            List<PlayerSearchResult> results = apiClient.searchPlayers(query);
            for (PlayerSearchResult p : results) displayedResults.add(p.toString());
        }
    }

    @FXML
    private void handleAddToTeam(ActionEvent event) {
        String selected = lvSearchResults.getSelectionModel().getSelectedItem();
        if (selected != null) {
            // simple placeholder: add a ForwardPlayer
            userTeam.addPlayer(new ForwardPlayer("0", selected, "Forward", "CustomTeam"));
            Alert alert = new Alert(Alert.AlertType.INFORMATION, selected + " added to your team!");
            alert.showAndWait();
        }
    }

    @FXML
    private void handleNext(ActionEvent event) throws IOException {
        // Normally pass team object, simplified for demo
        Stage stage = (Stage) btnNext.getScene().getWindow();
        Navigation.goTo(stage, "/com/sss/view/TeamSummary.fxml", "Team Summary");
    }
}