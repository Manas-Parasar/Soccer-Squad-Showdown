package com.sss;

import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.io.IOException;

public class Navigation {
    public static void goTo(Stage stage, String fxmlPath, String title) throws IOException {
        Parent root = FXMLLoader.load(Navigation.class.getResource(fxmlPath));
        Scene scene = new Scene(root, 900, 600);
        stage.setTitle(title);
        stage.setScene(scene);
        stage.show();
    }
}