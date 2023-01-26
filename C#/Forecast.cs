using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace CSharpExamples
{
    class Forecast
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

            // get forecasts for a specific country
            Console.WriteLine("\n***********Get forecasts for a specific country***********");
            var getForecastByCountry = GetForecastByCountry("mexico").Result;
            Console.WriteLine(getForecastByCountry);

            // get forecasts for multiple countries 
            Console.WriteLine("\n***********Get forecasts for multiple countries***********");
            var getForecastsByCountries = GetForecastsByCountries(new string[] { "mexico","sweden" }).Result;
            Console.WriteLine(getForecastsByCountries);

            // get forecasts for a specific indicator
            Console.WriteLine("\n***********Get forecasts for a specific indicator***********");
            var getForecastsByIndicator = GetForecastsByIndicator("gdp").Result;
            Console.WriteLine(getForecastsByIndicator);

            // get forecasts for multiple indicators
            Console.WriteLine("\n***********Get forecasts for multiple indicators***********");
            var getForecastsMultiIndicator = GetForecastsMultiIndicator(new string[] { "gdp", "population" }).Result;
            Console.WriteLine(getForecastsMultiIndicator);
        
            // get forecasts by country and indicator
            Console.WriteLine("\n***********Get forecasts for country and indicator***********");
            var getForecastsByCountryIndicator = GetForecastsByCountryIndicator( "mexico" ,  "gdp" ).Result;
            Console.WriteLine(getForecastsByCountryIndicator);

            //get forecasts by countries and indicators
            Console.WriteLine("\n***********Get forecasts for countries and indicators********");
            var getForecastsByCountriesIndicators = GetForecastsByCountriesIndicators(new string[] { "mexico", "sweden" }, new string[] { "gdp", "population" }).Result;
            Console.WriteLine(getForecastsByCountriesIndicators);

            Console.ReadLine();
        }

       
        /// <summary>
        /// Get forecasts for a sprecific country
        /// </summary>
        /// <param name="country">Name of the country</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetForecastByCountry(string country)
        {
            return await HttpRequester($"/forecast/country/{country}");
        }

        /// <summary>
        /// Get forecasts by countries 
        /// </summary>
        /// <param name="countries">List of countries</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetForecastsByCountries(string[] countries)
        {

            return await HttpRequester($"/forecast/country/{string.Join(",", countries)}");
        }

        /// <summary>
        /// Get forecasts by indicators 
        /// </summary>
        /// <param name="indicators">List of indicators</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetForecastsMultiIndicator(string[] indicators)
        {

            return await HttpRequester($"/forecast/indicator/{string.Join(",", indicators)}");
        }

        /// <summary>
        /// Get forecasts for a a specific indicator 
        /// </summary>
        /// <param name="indicator">Name of the indicator</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetForecastsByIndicator(string indicator)
        {
            return await HttpRequester($"/forecast/indicator/{indicator}");
        }

        /// <summary>
        /// Get forecasts for a single country and indicator
        /// </summary>
        /// <param name="country">List of countries</param>
        /// <param name="indicator">List of indicators</param>

        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetForecastsByCountryIndicator(string country, string indicator)
        {

            return await HttpRequester($"/forecast/country/{country}/indicator/{indicator}");
        }


        /// <summary>
        /// Get forecasts by countries and indicators
        /// </summary>
        /// <param name="countries">List of countries</param>
        /// <param name="indicators">List of indicators</param>

        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetForecastsByCountriesIndicators(string[] countries, string[] indicators)
        {

            return await HttpRequester($"/forecast/country/{string.Join(",", countries)}/indicator/{string.Join(",", indicators)}");
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