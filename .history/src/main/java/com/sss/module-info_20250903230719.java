module com.sss {

    opens com.sss to javafx.fxml;
    opens com.sss.controller to javafx.fxml;
    opens com.sss.model to javafx.fxml;

    exports com.sss;
    exports com.sss.controller;
    exports com.sss.model;
}