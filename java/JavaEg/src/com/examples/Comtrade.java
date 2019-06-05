package com.examples;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class Comtrade
{


    public static void main(String[] args) throws IOException
    {
        getComtradeCategories();
        getComtradeCountries();
        getComtradeByCountry();
        getComtradeByCountryPage();
        getComtradeBetweenTwoCountries();
        getComtradeHistorical();

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

    public static  void getComtradeCategories() throws IOException
    {

        //set the path for the query
        String path = "/comtrade/categories";

        System.out.println("--------Get detailed information about comtrade main categories--------");
        constructUrl(path);
    }

    public static void getComtradeCountries() throws IOException {

        //set the path for the query
        String path = "/comtrade/countries";

        System.out.println("--------Get detailed information about comtrade countries--------");
        constructUrl(path);

    }
    public static void getComtradeByCountry() throws IOException {

        //put category name here
        String params = "portugal";
        params = params.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/comtrade/country" + "/" + params;

        System.out.println("--------Get detailed information about comtrade per country--------");
        constructUrl(path);

    }


    public static void getComtradeByCountryPage() throws IOException {

        //put country name here
        String params = "portugal";
        params = params.replaceAll("\\s","%20");
        //put page number here
        String page = "2";
        //set the path for the query
        String path = "/comtrade/country" + "/" + params + "/" + page;

        System.out.println("--------Get comtrade data by specific country and page--------");
        constructUrl(path);

    }

    public static void getComtradeBetweenTwoCountries() throws IOException {

        //put country name here
        String params = "portugal";
        params = params.replaceAll("\\s","%20");
        //put country name here
        String params1 = "spain";
        params1 = params1.replaceAll("\\s","%20");
        //put page number here
        String page = "2";
        //set the path for the query
        String path = "/comtrade/country" + "/" + params + "/" + params1 + "/" + page ;

        System.out.println("--------Get comtrade data between countries and page number-------");
        constructUrl(path);

    }

    public static void getComtradeHistorical() throws IOException {

        //put symbol name here
        String params = "PRTESP24031";
        params = params.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/comtrade/historical" + "/" + params ;

        System.out.println("--------Get comtrade historical data by symbol--------");
        constructUrl(path);

    }
}
