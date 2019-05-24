package com.examples;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

public class Calendar {

    public static void main(String[] args) throws IOException
    {
        getCalendar();
        getCalendarBetweenDates();
        getCalendarByCountry();
        getCalendarByCountryDates();
        getCalendarByIndicator();
        getCalendarByCountryIndicator();
        getCalendarById();
        getCalendarByTicker();

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


    public static  void getCalendar() throws IOException
    {
        //set the path for the query
        String path = "/calendar";

        System.out.println("--------Calendar events--------");
        constructUrl(path);

    }

    public static void getCalendarBetweenDates() throws IOException {

        //put here your dates(date format yyyy-mm-dd)
        String params = "2016-12-02/2016-12-03" ;
        //set the path for the query
        String path = "/calendar/country/all" + "/" + params;

        System.out.println("--------Calendar events between dates--------");
        constructUrl(path);


    }
    public static void getCalendarByCountry() throws IOException {

        //put country or countries name here
        String params = "united states,china";
        params = params.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/calendar/country" + "/" + params;

        System.out.println("--------Calendar events by country or countries--------");
        constructUrl(path);

    }
    public static void getCalendarByCountryDates() throws IOException {

        //put country or countries name here
        String params = "united states" + "/";
        params = params.replaceAll("\\s","%20");
        //put dates here
        String params1 = "2016-02-01/201-02-10";
        //set the path for the query
        String path = "/calendar/country" + "/" + params + params1;

        System.out.println("--------Calendar events by country and dates--------");
        constructUrl(path);

    }
    public static void getCalendarByIndicator() throws IOException {

        //put indicator name here
        String params = "inflation rate" + "/";
        params = params.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/calendar/indicator" + "/" + params ;

        System.out.println("--------Calendar events by specific indicator--------");
        constructUrl(path);

    }
    public static void getCalendarByCountryIndicator() throws IOException {

        //put country name here
        String params = "united states" + "/";
        params = params.replaceAll("\\s","%20");
        //put indicator name here
        String params1 = "initial jobless claims";
        params1 = params1.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/calendar/country" + "/" + params + "indicator" + "/" + params1;

        System.out.println("--------Calendar events by specific country and indicator--------");
        constructUrl(path);

    }
    public static void getCalendarById() throws IOException {

        //put id's here
        String params = "174108,160025, 160030" + "/";
        params = params.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/calendar/calendarid" + "/" + params ;

        System.out.println("--------Calendar events by specific id--------");
        constructUrl(path);

    }
    public static void getCalendarByTicker() throws IOException {

        //put id's here
        String params = "BAHRAININFNRATE, SPAINFACORD, IJCUSA" + "/";
        params = params.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/calendar/ticker" + "/" + params ;

        System.out.println("--------Calendar events by specific ticker--------");
        constructUrl(path);

    }
}