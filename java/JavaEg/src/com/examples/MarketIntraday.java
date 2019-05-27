package com.examples;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class MarketIntraday
{

    public static void main(String[] args) throws IOException
    {
    getIntradayBySymbol();
    getIntradayByDateTime();
    getIntradayBetweenDates();

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


    public static  void getIntradayBySymbol() throws IOException
    {
        //put symbol here
        String params = "aapl:us";
        params = params.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/markets/intraday" + "/" + params;

        System.out.println("--------Intraday for a single market--------");
        constructUrl(path);

    }

    public static void getIntradayByDateTime() throws IOException {

        //put symbols here
        String params = "aapl:us";
        params = params.replaceAll("\\s","%20");
        //put date and time here (date format yyyy-mm-dd, time format: hh-mm)
        String date = "2017-08-10 15:30";
        date = date.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/markets/intraday" + "/" + params + "?d1=" + date;

        System.out.println("--------Intraday by symbol date and time--------");
        constructUrl(path);

    }
    public static void getIntradayBetweenDates() throws IOException {

        //put symbol here
        String params = "aapl:us";
        params = params.replaceAll("\\s","%20");
        //put date here (date format: yyyy-mm-dd)
        String date = "2017-08-01" + "&d2=" + "2017-08-08";
        //set the path for the query
        String path = "/markets/intraday" + "/" + params + "?d1=" + date;

        System.out.println("--------Historical markets between dates--------");
        constructUrl(path);

    }



}



