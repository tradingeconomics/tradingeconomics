package com.examples;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class Indicators
{
    public static void main(String[] args) throws IOException
    {
        getIndicators();
        getIndicatorsByCountry();
        getIndicatorsByIndicator();
        getHistoricalCountryIndicator();
        getHistoricalCountryIndicatorDate();
        getHistoricalCountryIndicatorBetweenDates();
        getHistoricalMultiCountryIndicator();
        getHistoricalByTicker();

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


    public static  void getIndicators() throws IOException
    {
        //set the path for the query
        String path = "/indicators";

        System.out.println("--------List of all indicators--------");
        constructUrl(path);

    }

    public static void getIndicatorsByCountry() throws IOException {

        //put country name here
        String params = "mexico";
        params = params.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/country" + "/" + params;

        System.out.println("--------List of indicators by country--------");
        constructUrl(path);


    }
    public static void getIndicatorsByIndicator() throws IOException {

        //put indicator name here
        String params = "gdp";
        params = params.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/country/all" + "/" + params;

        System.out.println("--------List of all countries with a specific indicator--------");
        constructUrl(path);

    }
    public static void getHistoricalCountryIndicator() throws IOException {

        //put country or countries name here
        String params = "mexico" + "/";
        params = params.replaceAll("\\s","%20");
        //put indicator name here
        String params1 = "gdp";
        params1 = params1.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/historical/country" + "/" + params + "indicator/" +  params1;

        System.out.println("--------Historical data by country and indicator--------");
        constructUrl(path);

    }
    public static void getHistoricalCountryIndicatorDate() throws IOException {

        //put country or countries name here
        String params = "mexico" + "/";
        params = params.replaceAll("\\s","%20");
        //put indicator name here
        String params1 = "gdp";
        params1 = params1.replaceAll("\\s","%20");
        //put start date here (date format: yyyy-mm-dd)
        String date = "2013-01-01";
        //set the path for the query
        String path = "/historical/country" + "/" + params + "indicator" + "/" + params1 + "/" + date;

        System.out.println("--------Historical data by country indicator and start date--------");
        constructUrl(path);

    }
    public static void getHistoricalCountryIndicatorBetweenDates() throws IOException {

        //put country or countries name here
        String params = "mexico" + "/";
        params = params.replaceAll("\\s","%20");
        //put indicator name here
        String params1 = "gdp";
        params1 = params1.replaceAll("\\s","%20");
        //put start date here (date format: yyyy-mm-dd)
        String date = "2015-01-01/2015-12-31";
        //set the path for the query
        String path = "/historical/country" + "/" + params + "indicator" + "/" + params1 + "/" + date;

        System.out.println("--------Historical data by country and indicator, between dates--------");
        constructUrl(path);

    }
    public static void getHistoricalMultiCountryIndicator() throws IOException {

        //put country or countries name here
        String params = "mexico" + "/";
        params = params.replaceAll("\\s","%20");
        //put indicator name here
        String params1 = "gdp,population";
        params1 = params1.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/historical/country" + "/" + params + "indicator/" + params1;

        System.out.println("--------Historical data with multiple countries and indicators--------");
        constructUrl(path);

    }
    public static void getHistoricalByTicker() throws IOException {

        //put ticker here
        String params = "USURTOT";
        params = params.replaceAll("\\s","%20");
        //put start date here (date format: yyyy-mm-dd)
        String date = "2015-03-01";
        //set the path for the query
        String path = "/historical/ticker" + "/" + params + "/" + date;

        System.out.println("--------Historical data by specific ticker--------");
        constructUrl(path);

    }
}


