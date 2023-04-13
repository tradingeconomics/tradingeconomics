package com.examples;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class Forecast
{
    public static void main(String[] args) throws IOException
    {
        getForecastByCountry();
        getForecastMultiCountry();
        getForecastIndicator();
        getForecastMultiIndicator();
        getForecastCountryIndicator();
        getForecastMultiCountryIndicator();

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


    public static  void getForecastByCountry() throws IOException
    {
        //put country name here
        String params = "mexico";
        params = params.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/forecast/country" + "/" + params;

        System.out.println("--------Forecasts by specific country--------");
        constructUrl(path);

    }

    public static void getForecastMultiCountry() throws IOException {

        //put countries name here
        String params = "mexico,sweden";
        params = params.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/forecast/country" + "/" + params;

        System.out.println("--------Forecasts for multiple countries--------");
        constructUrl(path);

    }
    public static void getForecastIndicator() throws IOException {

        //put indicator name here
        String params = "gdp";
        params = params.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/forecast/indicator" + "/" + params;

        System.out.println("--------Forecast by specific indicator--------");
        constructUrl(path);

    }
    public static void getForecastMultiIndicator() throws IOException {

        //put indicators name here
        String params = "gdp,population";
        params = params.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/forecast/indicator" + "/" + params;

        System.out.println("--------Forecasts for multiple indicators--------");
        constructUrl(path);

    }
    public static void getForecastCountryIndicator() throws IOException {

        //put country or countries name here
        String params = "mexico" + "/";
        params = params.replaceAll("\\s","%20");
        //put indicator name here
        String params1 = "gdp";
        params1 = params1.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/historical/country" + "/" + params + "indicator" + "/" + params1;

        System.out.println("--------Forecasts by country and indicator--------");
        constructUrl(path);

    }
    public static void getForecastMultiCountryIndicator() throws IOException {

        //put countries name here
        String params = "mexico,sweden" + "/";
        params = params.replaceAll("\\s","%20");
        //put indicators name here
        String params1 = "gdp,population";
        params1 = params1.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/historical/country" + "/" + params + "indicator" + "/" + params1;

        System.out.println("--------Forecasts for multiple countries and indicators--------");
        constructUrl(path);

    }

}



