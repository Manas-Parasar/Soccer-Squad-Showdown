package com.sss.controller;

import com.sss.PlayerFactory;
import com.sss.api.ApiClient;
import com.sss.api.PlayerSearchResult;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.ListView;
import javafx.scene.control.TextField;

import java.util.List;

public class PlayerSelectController {

    @FXML
    private TextField playerNameField;

    @FXML
    private Button searchButton;

    @FXML
    private ListView<PlayerSearchResult> resultsList;

    private final ApiClient apiClient = new ApiClient();

    @FXML
    public void initialize() {
        searchButton.setOnAction(e -> searchPlayers());
    }

    private void searchPlayers() {
        String playerName = playerNameField.getText().trim();
        if (!playerName.isEmpty()) {
            List<PlayerSearchResult> results = apiClient.searchPlayers(playerName);
            ObservableList<PlayerSearchResult> observableResults =
                    FXCollections.observableArrayList(results);
            resultsList.setItems(observableResults);
        }
    }
}