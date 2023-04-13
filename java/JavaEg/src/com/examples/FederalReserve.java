package com.examples;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class FederalReserve
{

    public static void main(String[] args) throws IOException
    {
        getFredStates();
        getFredCounties();
        getFredSymbol();
        getFredUrl();
        getFredCountry();
        getFredState();
        getFredCounty();
        getFredPike();
        getFredCountryPage();
        getFredHistoricalSymbol();

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

    public static  void getFredStates() throws IOException
    {

        //set the path for the query
        String path = "/fred/states";

        System.out.println("--------Get a list of all states--------");
        constructUrl(path);
    }

    public static void getFredCounties() throws IOException {

        //put county name here
        String params = "arkansas";
        params = params.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/fred/counties" + "/" + params;

        System.out.println("--------Get a list of counties per state--------");
        constructUrl(path);

    }
    public static void getFredSymbol() throws IOException {

        //put symbol name here
        String params = "ALLMARGATTN";
        params = params.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/fred/snapshot/symbol" + "/" + params;

        System.out.println("--------Get fred snapshot by symbol--------");
        constructUrl(path);

    }


    public static void getFredUrl() throws IOException {

        //put country name here
        String url = "/united-states/all-marginally-attached-workers-for-tennessee-fed-data.html";
        url = url.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/fred/snapshot/url" + "?url=" + url;

        System.out.println("--------Get fred data by url--------");
        constructUrl(path);

    }

    public static void getFredCountry() throws IOException {

        //put country name here
        String params = "united states";
        params = params.replaceAll("\\s","%20");
            //set the path for the query
        String path = "/fred/snapshot/country" + "/" + params;

        System.out.println("--------Get fred data by country-------");
        constructUrl(path);

    }

    public static void getFredState() throws IOException {

        //put state name here
        String params = "tennessee";
        params = params.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/fred/snapshot/state" + "/" + params ;

        System.out.println("--------Get fred data by state--------");
        constructUrl(path);

    }

    public static void getFredCounty() throws IOException {

        //put county name here
        String params = "arkansas";
        params = params.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/fred/snapshot/county" + "/" + params ;

        System.out.println("--------Get fred data by county--------");
        constructUrl(path);

    }

    public static void getFredPike() throws IOException {

        //put county name here
        String params = "Pike County, AR";
        params = params.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/fred/snapshot/county" + "/" + params ;

        System.out.println("--------Get fred data of Pike County--------");
        constructUrl(path);

    }

    public static void getFredCountryPage() throws IOException {

        //put country name here
        String params = "united states";
        params = params.replaceAll("\\s","%20");
        //put page number here
        String page = "2";
        //set the path for the query
        String path = "/fred/snapshot/country" + "/" + params + "/" + page;

        System.out.println("--------Get fred data by country and page number--------");
        constructUrl(path);

    }

    public static void getFredHistoricalSymbol() throws IOException {

        //put symbol or symbols name here
        String params = "RACEDISPARITY005007,2020RATIO002013";
        params = params.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/fred/historical" + "/" + params ;

        System.out.println("--------Get fred historical data by symbol--------");
        constructUrl(path);

    }

}

