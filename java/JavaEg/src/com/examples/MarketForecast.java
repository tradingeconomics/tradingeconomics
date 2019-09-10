package com.examples;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class MarketForecast {
    public static void main(String[] args) throws IOException
    {
        getMarketForecastCategory();
        getMarketForecastSymbol();

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


    public static  void getMarketForecastCategory() throws IOException
    {
        //put category here (category can be: index, bond, currency and commodity)
        String params = "index";
        params = params.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/markets/forecasts" + "/" + params;

        System.out.println("--------Market Forecasts by category--------");
        constructUrl(path);

    }

    public static void getMarketForecastSymbol() throws IOException {

        //put symbols here
        String params = "BULGARIAGOVB10Y:GOV,LITHUANIAGOVBON10Y:GOV,GBGB10YR:GOV";
        params = params.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/markets/forecasts/symbol" + "/" + params;

        System.out.println("--------Market Forecasts by multiple symbols--------");
        constructUrl(path);

    }

}
