package com.examples;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class News
{

    public static void main(String[] args) throws IOException
    {
        getNews();
        getNewsByCountry();
        getNewsByIndicator();
        getNewsByCountryIndicator();
        getNewsByPage();

    }

    public static void constructUrl(String path) throws IOException
    {
        String _clientKey = "guest:guest";
        String base_url = "http://api.tradingeconomics.com";
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

    public static  void getNews() throws IOException
    {

        //set the path for the query
        String path = "/news";

        System.out.println("--------Get the latest news--------");
        constructUrl(path);
    }

    public static void getNewsByCountry() throws IOException {

        //put country or countries here
        String params = "mexico";
        params = params.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/news/country" + "/" + params ;

        System.out.println("--------Get news by country--------");
        constructUrl(path);

    }
    public static void getNewsByIndicator() throws IOException {

        //put indicator or indicators name here
        String params = "inflation rate";
        params = params.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/news/indicator" + "/" + params;

        System.out.println("--------Get news by indicator--------");
        constructUrl(path);

    }

    public static void getNewsByCountryIndicator() throws IOException {

        //put country or countries name here
        String params = "mexico";
        params = params.replaceAll("\\s","%20");
        //put indicator or indicators name here
        String params1 = "inflation rate";
        params1 = params1.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/news/country" + "/" + params + "/" + params1;

        System.out.println("--------Get news by indicator--------");
        constructUrl(path);

    }
    public static void getNewsByPage() throws IOException {

        //put limit list size here
        String limit = "15";
        //put start index here
        String start = "10";
        //set the path for the query
        String path = "/news" + "?limit=" + limit + "&start=" + start;

        System.out.println("--------Get news by start index and limit size list--------");
        constructUrl(path);

    }


}
