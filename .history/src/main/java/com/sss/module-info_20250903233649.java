module com.sss {
    requires javafx.controls;
    requires javafx.fxml;
    requires com.google.gson;
    requires unirest.java;

    opens com.sss.controller to javafx.fxml, com.google.gson;
    opens com.sss.model to com.google.gson;
    opens com.sss.api to com.google.gson;
    opens com.sss to com.google.gson;

    exports com.sss;
    exports com.sss.controller;
    exports com.sss.model;
    exports com.sss.api;
}