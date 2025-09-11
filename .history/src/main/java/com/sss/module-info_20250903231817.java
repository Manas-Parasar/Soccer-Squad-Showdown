module com.sss {
    requires javafx.controls;
    requires javafx.fxml;

    // External libraries
    requires unirest.java;
    requires com.google.gson;

    // Allow FXML to access your controllers
    opens com.sss.controller to javafx.fxml, com.google.gson;
    opens com.sss to com.google.gson;

    exports com.sss;
    exports com.sss.api;
    exports com.sss.controller;
}