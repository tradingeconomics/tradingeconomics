using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace CSharpExamples
{
    class Comtrade
    {
        /// <summary>
        /// Store the client key to be used through the program
        /// </summary>
        static string _clientKey = "guest:guest";

        static void Main(string[] args)
        {
            // set the client key
            Console.WriteLine("\nProvide a API key; otherwise, press ENTER to use the default test key...");
            string k = Console.ReadLine();
            if (!string.IsNullOrWhiteSpace(k))
                _clientKey = k;

            // get comtrade categories
            Console.WriteLine("\n**********Get comtrade categories**********");
            var getComCategories = GetComCategories().Result;
            Console.WriteLine(getComCategories);

            // get comtrade countries 
            Console.WriteLine("\n**********Get comtrade countries **********");
            var getComCountries = GetComCountries().Result;
            Console.WriteLine(getComCountries);

            // Filtering by the country and page number
            Console.WriteLine("\n**********Get comtrade by country and page number**********");
            var getComCountryPage = GetComCountryPage("portugal", 4).Result;
            Console.WriteLine(getComCountryPage);

            // get comtrade between two countries and page number
            Console.WriteLine("\n**********Get comtrade countries and page number**********");
            var getComBetweenCountries = GetComBetweenCountries("portugal", "spain", 2).Result;
            Console.WriteLine(getComBetweenCountries);

            // Get comtrade historical data by symbol
            Console.WriteLine("\n**********Get comtrade historical data by symbol**********");
            var getComHistorical = GetComHistorical("PRTESP24031").Result;
            Console.WriteLine(getComHistorical);


            Console.ReadLine();
        }

        /// <summary>
        /// get categories
        /// </summary>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetComCategories()
        {
            return await HttpRequester("/comtrade/categories");
        }

        /// <summary>
        /// get countries
        /// </summary>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetComCountries()
        {
            return await HttpRequester("/comtrade/countries");
        }

    
        /// <summary>
        /// Get comtrade by country and page number
        /// </summary>
        /// <param name="country">country</param>
        /// <param name="page_number">pagination</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetComCountryPage(string country, int page_number)
        {

            return await HttpRequester($"/comtrade/country/{country}/{page_number}");
        }


        /// <summary>
        /// Get comtrade between 2 countries and page number
        /// </summary>
        /// <param name="country1">country</param>
        /// <param name="country2">country</param>
        /// <param name="page_number">pagination</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetComBetweenCountries(string country1, string country2, int page_number)
        {

            return await HttpRequester($"/comtrade/country/{country1}/{country2}/{page_number}");
        }

        /// <summary>
        /// Get historical by symbol
        /// </summary>
        /// <param name="symbol">country</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetComHistorical(string symbol)
        {

            return await HttpRequester($"/comtrade/historical/{symbol}");
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