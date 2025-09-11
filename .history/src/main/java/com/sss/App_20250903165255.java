package com.sss;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.image.Image;
import javafx.stage.Stage;

public class App extends Application {

    private static Stage primaryStage;

    @Override
    public void start(Stage stage) throws Exception {
        primaryStage = stage;
        FXMLLoader loader = new FXMLLoader(App.class.getResource("view/MainMenu.fxml"));
        Scene scene = new Scene(loader.load(), 1100, 700);
        scene.getStylesheets().add(App.class.getResource("styles.css").toExternalForm());
        stage.setTitle("⚽ Soccer Squad Showdown");
        stage.getIcons().add(new Image(App.class.getResourceAsStream("/images/default.png")));
        stage.setScene(scene);
        stage.show();
    }

    public static void navigate(String fxml, Object controller) {
        try {
            FXMLLoader loader = new FXMLLoader(App.class.getResource("view/" + fxml));
            if (controller != null) loader.setController(controller);
            Scene scene = new Scene(loader.load(), 1100, 700);
            scene.getStylesheets().add(App.class.getResource("styles.css").toExternalForm());
            primaryStage.setScene(scene);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static javafx.stage.Stage getPrimaryStage() { return primaryStage; }

    public static void main(String[] args) { launch(); }
}