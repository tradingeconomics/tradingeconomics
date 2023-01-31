package com.examples;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class Ratings
{
    public static void main(String[] args) throws IOException
    {
        getRatings();
        getRatingsCountry();
        getRatingsHistoricalCountry();
        getLatestUpdates();
        getLatestUpdatesByDate();

    }

    public static void constructUrl(String path) throws IOException
    {
        String _clientKey = "guest:guest";
        String base_url = "http://api.tradingeconomics.com";
        String auth = base_url + path + "?c=" + _clientKey;

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


    public static  void getRatings() throws IOException
    {
        //set the path for the query
        String path = "/ratings";

        System.out.println("--------List of credit ratings for all countries--------");
        constructUrl(path);

    }

    public static void getRatingsCountry() throws IOException {

        //put country or countries name here
        String params = "mexico";
        params = params.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/ratings" + "/" + params;

        System.out.println("--------List of credit ratings by country or countries--------");
        constructUrl(path);


    }
    public static void getRatingsHistoricalCountry() throws IOException {

        //put country or countries name here
        String params = "mexico,sweden";
        params = params.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/ratings/historical" + "/" + params;

        System.out.println("--------List of historical credit ratings for multiple countries--------");
        constructUrl(path);

    }
    public static void getLatestUpdates() throws IOException {

        //set the path for the query
        String path = "/updates";

        System.out.println("--------Get the latest updates--------");
        constructUrl(path);

    }
    public static void getLatestUpdatesByDate() throws IOException {

        //put start date here (date format: yyyy-mm-dd)
        String date = "2018-01-01";
        //set the path for the query
        String path = "/updates" + "/" + date;

        System.out.println("--------Get latest updates by a start date--------");
        constructUrl(path);

    }

}



