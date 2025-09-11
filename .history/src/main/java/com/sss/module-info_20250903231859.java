module com.sss {
    requires javafx.controls;
    requires javafx.fxml;

    // External libraries
    requires unirest.java;
    requires com.google.gson;

    // For FXML to access controller fields
    opens com.sss.controller to javafx.fxml, com.google.gson;
    opens com.sss to com.google.gson;

    // Export packages
    exports com.sss;
    exports com.sss.api;
    exports com.sss.controller;
}