package com.examples;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class WorldBank
{

    public static void main(String[] args) throws IOException
    {
        getWBByPage();
        getWBByCategory();
        getWBIndicator();
        getWBCategories();
        getWBCountryPage();
        getWBHistorical();
        getWBByUrl();

    }

    public static void constructUrl(String path) throws IOException
    {
        String _clientKey = "guest:guest";
        String base_url = "https://api.tradingeconomics.com";
        String auth;
        if (path.contains("?"))
            auth = base_url + path + "&c=" + _clientKey;
        else
            auth = base_url + path + "?c=" + _clientKey;

        URL obj = new URL(auth);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();

        BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);

        }
        in.close();

        //print result
        System.out.println(response.toString());
    }

    public static  void getWBCategories() throws IOException
    {

        //set the path for the query
        String path = "/worldBank/categories";

        System.out.println("--------Get main categoriess--------");
        constructUrl(path);
    }

    public static void getWBByCategory() throws IOException {

        //put category name here
        String params = "Education";
        params = params.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/worldBank/category" + "/" + params ;

        System.out.println("--------Get world bank data by category--------");
        constructUrl(path);

    }
    public static void getWBByPage() throws IOException {

        //put category name here
        String params = "Education";
        params = params.replaceAll("\\s","%20");
        //put page number here
        String page = "2";
        //set the path for the query
        String path = "/worldBank/category" + "/" + params + "/" + page;

        System.out.println("--------Get world bank data by category and page number--------");
        constructUrl(path);

    }

    public static void getWBIndicator() throws IOException {

        //put series code here
        String series_code = "fr.inr.rinr";
        series_code = series_code.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/worldBank/indicator" + "?s=" + series_code;

        System.out.println("--------Get world bank data by specific indicator--------");
        constructUrl(path);

    }
    public static void getWBCountryPage() throws IOException {

        //put country name here
        String params = "portugal";
        params = params.replaceAll("\\s","%20");
        //put page number here
        String page = "2";
        //set the path for the query
        String path = "/worldBank/country" + "/" + params + "/" + page;

        System.out.println("--------Get world bank data by specific country and page--------");
        constructUrl(path);

    }

    public static void getWBByUrl() throws IOException {

        //put urlhere
        String url = "/united-states/real-interest-rate-percent-wb-data.html";
        url = url.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/worldBank/indicator" + "?url=" + url ;

        System.out.println("--------Get world bank data by specific url--------");
        constructUrl(path);

    }

    public static void getWBHistorical() throws IOException {

        //put series code here
        String series_code = "usa.fr.inr.rinr";
        series_code = series_code.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/worldBank/historical" + "?s=" + series_code ;

        System.out.println("--------Get world bank historical data by specific series code--------");
        constructUrl(path);

    }
}
