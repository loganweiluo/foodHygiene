package rating;

import org.apache.http.HttpEntity;
import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;

import java.io.IOException;

/**
 * Created by weiluo on 20/05/15.
 */
public class AuthorityRetriever {
    public String getAuthoritiesAsString() throws IOException {
        CloseableHttpClient httpClient = HttpClientBuilder.create().build();
        try {
            // specify the host, protocol, and port
            HttpHost target = new HttpHost("api.ratings.food.gov.uk", 80, "http");

            // specify the get request
            HttpGet getRequest = new HttpGet("/Authorities");
            getRequest.addHeader("Accept", "application/json");
            getRequest.addHeader("x-api-version", "2");

            System.out.println("executing request to " + target);

            HttpResponse httpResponse = httpClient.execute(target, getRequest);
            HttpEntity entity = httpResponse.getEntity();

            System.out.println("----------------------------------------");
            System.out.println(httpResponse.getStatusLine());

            if (entity != null) {
                System.out.println(EntityUtils.toString(entity));
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // When HttpClient instance is no longer needed,
            // shut down the connection manager to ensure
            // immediate deallocation of all system resources
            httpClient.close();
        }
        return null;
    }
}
