package com.examples;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class Articles
{
    public static void main(String[] args) throws IOException
    {
        getArticles();
        getArticlesByCountry();
        getArticlesByCountryDate();
        getArticlesByIndicator();
        getArticlesByCountryIndicator();
        getArticlesId();
        getArticlesByPage();

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

    public static  void getArticles() throws IOException
    {

        //set the path for the query
        String path = "/articles";

        System.out.println("--------Get the latest articles--------");
        constructUrl(path);
    }

    public static void getArticlesByCountry() throws IOException {

        //put country or countries here
        String params = "united states";
        params = params.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/articles/country" + "/" + params ;

        System.out.println("--------Get articles by country--------");
        constructUrl(path);

    }

    public static void getArticlesByCountryDate() throws IOException {

        //put country or countries here
        String params = "united states";
        params = params.replaceAll("\\s","%20");
        //put dates here
        String date = "2016-12-01/2016-12-31";
        //set the path for the query
        String path = "/articles/country" + "/" + params + "/from" + "/" + date ;

        System.out.println("--------Get articles by country and dates--------");
        constructUrl(path);

    }

    public static void getArticlesByIndicator() throws IOException {

        //put indicator or indicators name here
        String params = "inflation rate";
        params = params.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/articles/indicator" + "/" + params;

        System.out.println("--------Get articles by indicator--------");
        constructUrl(path);

    }

    public static void getArticlesByCountryIndicator() throws IOException {

        //put country or countries name here
        String params = "united states";
        params = params.replaceAll("\\s","%20");
        //put indicator or indicators name here
        String params1 = "inflation rate";
        params1 = params1.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/news/country" + "/" + params + "/" + params1;

        System.out.println("--------Get articles by indicator--------");
        constructUrl(path);

    }
    public static void getArticlesId() throws IOException {

        //put id here
        String params= "20580";
        params = params.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/articles/id" + "/" +  params;

        System.out.println("--------Get articles by id--------");
        constructUrl(path);

    }

    public static void getArticlesByPage() throws IOException {

        //put limit list size here
        String lim = "10";
        //put start index here
        String start = "10";
        //set the path for the query
        String path = "/articles" + "?lim=" + lim + "&start=" + start;

        System.out.println("--------Get articles by start index and limit size list--------");
        constructUrl(path);

    }

}

