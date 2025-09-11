import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;

public class AllSportsAPIExample {
    public static void main(String[] args) {
        String apiKey = "YOUR_API_KEY";

        HttpResponse<JsonNode> response = Unirest.get(
            "https://apiv2.allsportsapi.com/football/?met=Players&APIkey=" + apiKey + "&leagueId=1&season=2025")
            .asJson();

        if (response.getStatus() == 200) {
            System.out.println(response.getBody());
        } else {
            System.out.println("API request failed: " + response.getStatus());
        }
    }
}