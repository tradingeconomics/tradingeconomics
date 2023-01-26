using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace CSharpExamples
{
    class Markets
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

            // get markets commodities
            Console.WriteLine("\n***********Get commodities***********");
            var getCommodities = GetCommodities().Result;
            Console.WriteLine(getCommodities);

            // get markets currency
            Console.WriteLine("\n***********Get currency***********");
            var getCurrency = GetCurrency().Result;
            Console.WriteLine(getCurrency);

            // get currency crosses
            Console.WriteLine("\n***********Get currency crosses***********");
            var getCurrencyCrosses = GetCurrencyCrosses().Result;
            Console.WriteLine(getCurrencyCrosses);

            // get markets indexes
            Console.WriteLine("\n***********Get markets indexes***********");
            var getMarketsBonds = GetMarketsBonds().Result;
            Console.WriteLine(getMarketsBonds);


            // get markets bond
            Console.WriteLine("\n***********Get markets indexes***********");
            var getMarketIndex = GetMarketIndex().Result;
            Console.WriteLine(getMarketIndex);

            // get markets for multiple symbols 
            Console.WriteLine("\n***********Get markets for multiple symbols***********");
            var getMarketSymbols = GetMarketSymbols(new string[] { "aapl:us", "gac:com" }).Result;
            Console.WriteLine(getMarketSymbols);

            // get markets for a specific symbol
            Console.WriteLine("\n***********Get markets for a specific symbol***********");
            var getMarketSymbol = GetMarketSymbol("aapl:us").Result;
            Console.WriteLine(getMarketSymbol);

            // get markets peers 
            Console.WriteLine("\n***********Get markets peers***********");
            var getMarketsPeers = GetMarketsPeers("aapl:us").Result;
            Console.WriteLine(getMarketsPeers);

            // get stock market index components
            Console.WriteLine("\n***********Get stock market index components***********");
            var getMarketsComponents = GetMarketsComponents("psi20:ind").Result;
            Console.WriteLine(getMarketsComponents);

            //get stock market by country and page number
            Console.WriteLine("\n***********Get stock market by country and page number********");
            var getMarketsByCountryPage = GetMarketsByCountryPage( "united states").Result;
            Console.WriteLine(getMarketsByCountryPage);

            Console.ReadLine();
        }


        /// <summary>
        /// Get currency
        /// </summary>
        /// <param name="commodities">commodities</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetCommodities()
        {
            return await HttpRequester($"/markets/commodities");
        }

        /// <summary>
        /// Get currency 
        /// </summary>
        /// <param name="currency">currency</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetCurrency()
        {

            return await HttpRequester($"/markets/currency");
        }

        /// <summary>
        /// Get currency crosses
        /// </summary>
        /// <param name="currency">currency</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetCurrencyCrosses()
        {

            return await HttpRequester($"/markets/currency?cross=eur");
        }

        /// <summary>
        /// Get market index
        /// </summary>
        /// <param name="index">index</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetMarketIndex()
        {

            return await HttpRequester($"/markets/index");
        }

        /// <summary>
        /// Get Bonds
        /// </summary>
        /// <param name="bonds">bonds</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetMarketsBonds()
        {

            return await HttpRequester($"/markets/bond");
        }


        /// <summary>
        /// Get markets by symbols
        /// </summary>
        /// <param name="symbols">List of symbols</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetMarketSymbols(string[] symbols)
        {

            return await HttpRequester($"/markets/symbol/{string.Join(",", symbols)}");
        }
        /// <summary>
        /// Get markets by a specific symbol 
        /// </summary>
        /// <param name="symbol">symbol</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetMarketSymbol(string symbol)
        {
            return await HttpRequester($"/markets/symbol/{symbol}");
        }

        /// <summary>
        /// Get markets peers
        /// </summary>
        /// <param name="peers">peers</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetMarketsPeers(string symbol)
        {

            return await HttpRequester($"/markets/peers/{symbol}");
        }

        /// <summary>
        /// Get components
        /// </summary>
        /// <param name="components">peers</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetMarketsComponents(string symbol)
        {

            return await HttpRequester($"/markets/components/{symbol}");
        }
        
        /// <summary>        
        /// /// Get markets by country and page number
        /// </summary>
        /// <param name="country">List of countries</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetMarketsByCountryPage(string country)
        {

            return await HttpRequester($"/markets/country/{country}?page=2");
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