using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace CSharpExamples
{
    class Indicator
    {
        /// <summary>
        /// Store the client key to be used through the program
        /// </summary>
        static string _clientKey = "guest:guest";

        static void Main(string[] args)
        {
            // set the client key
            Console.WriteLine("Provide a API key; otherwise, press ENTER to use the default test key...");
            string k = Console.ReadLine();
            if (!string.IsNullOrWhiteSpace(k))
                _clientKey = k;

            // get a list of indicators
            Console.WriteLine("\nAbout to get all indicators");
            var getIndicatorsResult = GetIndicators().Result;
            Console.WriteLine(getIndicatorsResult);

            // get a list of indicators from a country
            Console.WriteLine("\nAbout to get a list of indicators of a country");
            var getIndicatorsByCountry = GetIndicatorsByCountry("mexico").Result;
            Console.WriteLine(getIndicatorsByCountry);

            // get an indicators from all countries
            Console.WriteLine("\nAbout to get a indicator for all country");
            var getIndicatorsAllCountries = GetIndicatorsAllCountries("gdp").Result;
            Console.WriteLine(getIndicatorsAllCountries);

            // get historical indicators given countries and indicators
            Console.WriteLine("\nAbout to get a list of indicator for multiple countries");
            var getHistoricalIndicatorsByCountries = GetHistoricalIndicatorsByCountries(new string[] { "mexico" }, new string[] { "gdp" }).Result;
            Console.WriteLine(getHistoricalIndicatorsByCountries);

            // get historical indicators given countries and indicators between start and end dates
            Console.WriteLine("\nAbout to get a historical list of indicator for multiple countries between start and end dates");
            var getHistoricalIndicatorsByCountriesDates = GetHistoricalIndicatorsByCountries(new string[] { "mexico" }, new string[] { "gdp" }, new DateTime(2015, 01, 01), new DateTime(2015, 12, 31)).Result;
            Console.WriteLine(getHistoricalIndicatorsByCountriesDates);

            // get historical data given a ticker
            Console.WriteLine("\nAbout to get historical data given a ticker");
            var getHistoricalByTicker = GetHistorycalByTicker("USURTOT", new DateTime(2015, 03, 01)).Result;
            Console.WriteLine(getHistoricalByTicker);

            Console.ReadLine();
        }

        /// <summary>
        /// Get all indicators without filters
        /// </summary>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetIndicators()
        {
            return await HttpRequester("/indicators");
        }

        /// <summary>
        /// Get a list of indicator form a specific country
        /// </summary>
        /// <param name="country">Name of the country</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetIndicatorsByCountry(string country)
        {
            return await HttpRequester($"/country/{country}");
        }

        /// <summary>
        /// Get a specific indicator for all countries
        /// </summary>
        /// <param name="indicator">Name of the indicator</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetIndicatorsAllCountries(string indicator)
        {
            return await HttpRequester($"/country/all/{indicator}");
        }

        /// <summary>
        /// Get historical indicators given countries, indicators, start and end date
        /// </summary>
        /// <param name="countries">List of countries</param>
        /// <param name="indicators">List of indicators</param>
        /// <param name="startDate">Start date</param>
        /// <param name="endDate">End date</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetHistoricalIndicatorsByCountries(string[] countries, string[] indicators, DateTime? startDate = null, DateTime? endDate = null)
        {
            if (startDate != null && endDate != null)
                return await HttpRequester($"/historical/country/{string.Join(",", countries)}/indicator/{string.Join(",", indicators)}/{startDate.Value.ToString("yyyy-MM-dd")}/{endDate.Value.ToString("yyyy-MM-dd")}");

            return await HttpRequester($"/historical/country/{string.Join(",", countries)}/indicator/{string.Join(",", indicators)}");
        }

        /// <summary>
        /// Get historical indicator data using the ticker
        /// </summary>
        /// <param name="ticker">Ticker</param>
        /// <param name="startDate">Start date if needed</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetHistorycalByTicker(string ticker, DateTime? startDate)
        {
            if (startDate != null)
                return await HttpRequester($"/historical/ticker/{ticker}/{startDate.Value.ToString("yyyy-MM-dd")}");

            return await HttpRequester($"/ihstorical/ticker/{ticker}");
        }

        /// <summary>
        /// Method to make HTTP calls to TradingEconomics API
        /// </summary>
        /// <param name="url">The URL to fetch</param>
        /// <param name="baseURL">The base path, the default is 'https://api.tradingeconomics.com/'</param>
        /// <returns>A task tha will be resolved in a string with the content of the response</returns>
        public async static Task<string> HttpRequester(string url, string baseURL = "https://api.tradingeconomics.com/")
        {
            try
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(baseURL);
                    client.DefaultRequestHeaders.Clear();

                    //ADD Acept Header to tell the server what data type you want
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/xml"));

                    //ADD Authorization
                    AuthenticationHeaderValue auth = new AuthenticationHeaderValue("Client", _clientKey);
                    client.DefaultRequestHeaders.Authorization = auth;

                    HttpResponseMessage response = await client.GetAsync(url);

                    response.EnsureSuccessStatusCode();

                    return await response.Content.ReadAsStringAsync();
                }
            }
            catch (Exception e)
            {
                return $"Error at HttpRequester with msg: {e}";
            }
        }

    }
}
