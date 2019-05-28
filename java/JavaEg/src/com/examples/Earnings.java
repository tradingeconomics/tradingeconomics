package com.examples;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class Earnings
{
    public static void main(String[] args) throws IOException
    {
        getEarnings();
        getEarningsByDate();
        getEarningsSymbolDate();
        getEarningsBetweenDates();
        getEarningsByCountry();
        getEarningsByType();

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

    public static  void getEarnings() throws IOException
    {

        //set the path for the query
        String path = "/earnings";
        System.out.println("--------Default earnings calendar--------");
        constructUrl(path);
    }

    public static void getEarningsByDate() throws IOException {

        //put symbol here
        String params = "aapl:us";
        params = params.replaceAll("\\s","%20");
        //put date and time here (date format yyyy-mm-dd)
        String date = "2017-01-01";
        date = date.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/earnings/symbol" + "/" + params + "?d1=" + date;

        System.out.println("--------Filter earnings calendar by symbol and date--------");
        constructUrl(path);

    }

    public static void getEarningsSymbolDate() throws IOException {

        //put symbol here
        String params = "aapl:us";
        params = params.replaceAll("\\s","%20");
        //put date here (date format: yyyy-mm-dd)
        String date = "2017-01-01";
        //set the path for the query
        String path = "/earnings/symbol" + "/" + params + "?d1=" + date;

        System.out.println("--------Get earnings by symbol and start date--------");
        constructUrl(path);

    }

    public static void getEarningsBetweenDates() throws IOException {

        //put symbol here
        String params = "msft:us";
        params = params.replaceAll("\\s","%20");
        //put date here (date format: yyyy-mm-dd)
        String date = "2016-01-01" + "&d2=" + "2017-12-31";
        //set the path for the query
        String path = "/earnings/symbol" + "/" + params + "?d1=" + date;

        System.out.println("--------Get earnings by symbol within a date interval--------");
        constructUrl(path);

    }

    public static void getEarningsByCountry() throws IOException {

        //put symbol here
        String params = "united states";
        params = params.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/earnings/country" + "/" + params;

        System.out.println("--------Get earnings by country--------");
        constructUrl(path);

    }

    public static void getEarningsByType() throws IOException {

        //put type here. Type can be earnings, ipo, dividends
        String type = "earnings";
        //set the path for the query
        String path = "/earnings" + "?type=" + type;

        System.out.println("--------Get earnings by type--------");
        constructUrl(path);

    }
}

