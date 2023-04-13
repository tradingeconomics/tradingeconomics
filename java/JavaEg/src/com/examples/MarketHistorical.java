package com.examples;

        import java.io.BufferedReader;
        import java.io.IOException;
        import java.io.InputStreamReader;
        import java.net.HttpURLConnection;
        import java.net.URL;

public class MarketHistorical
{
    public static void main(String[] args) throws IOException
    {
        getHistoricalSymbol();
        getHistoricalMultiSymbol();
        getHistoricalByDate();
        getHistoricalBetweenDates();

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


    public static  void getHistoricalSymbol() throws IOException
    {
        //put symbol here
        String params = "aapl:us";
        params = params.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/markets/historical" + "/" + params;

        System.out.println("--------Historical markets by symbol--------");
        constructUrl(path);

    }

    public static void getHistoricalMultiSymbol() throws IOException {

        //put symbols here
        String params = "aapl:us,gac:com";
        params = params.replaceAll("\\s","%20");
        //set the path for the query
        String path = "/markets/historical" + "/" + params;

        System.out.println("--------Historical markets by multiple symbols--------");
        constructUrl(path);

    }
    public static void getHistoricalByDate() throws IOException {

        //put symbol here
        String params = "aapl:us";
        params = params.replaceAll("\\s","%20");
        //put date here (date format: yyyy-mm-dd)
        String date = "2017-08-01";
        //set the path for the query
        String path = "/markets/historical" + "/" + params + "?d1=" + date;

        System.out.println("--------Historical markets by start date--------");
        constructUrl(path);

    }
    public static void getHistoricalBetweenDates() throws IOException {

        //put indicators name here
        String params = "aapl:us";
        params = params.replaceAll("\\s","%20");
        //put start date here
        String start_date = "2017-08-01";
        //put end date here
        String end_date = "2017-08-08";
        //set the path for the query
        String path = "/markets/historical" + "/" + params + "?d1=" + start_date + "&d2=" + end_date;

        System.out.println("--------Historical markets between dates--------");
        constructUrl(path);

    }


}


