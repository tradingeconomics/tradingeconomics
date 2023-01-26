using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace CSharpExamples
{
    class FederalReserve
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

            // get fred categories
            Console.WriteLine("\n**********Get federal reserve states**********");
            var getFredStates = GetFredStates().Result;
            Console.WriteLine(getFredStates);

            // get fred per state
            Console.WriteLine("\n**********Get federal reserve data per state**********");
            var getFredCounty = GetFredCounty("arkansas").Result;
            Console.WriteLine(getFredCounty);

            // Filtering by symbol
            Console.WriteLine("\n**********Get federal reserve data by symbol**********");
            var getFredSymbol = GetFredSymbol("ALLMARGATTN").Result;
            Console.WriteLine(getFredSymbol);

            // Filtering by url
            Console.WriteLine("\n**********Get federal reserve data by url**********");
            var getFredUrl = GetFredUrl("/united-states/income-inequality-in-aleutians-east-borough-ak-fed-data.html").Result;
            Console.WriteLine(getFredUrl);

            // Get fred data by country
            Console.WriteLine("\n**********Get federal reserve country**********");
            var getFredSnapCountry = GetFredSnapCountry("united states").Result;
            Console.WriteLine(getFredSnapCountry);

            // Get fred data by state
            Console.WriteLine("\n**********Get federal reserve by state**********");
            var getFredSnapState = GetFredSnapState("tennessee").Result;
            Console.WriteLine(getFredSnapState);


            // Get fred data by county
            Console.WriteLine("\n**********Get federal reserve by county**********");
            var getFredSnapCounty = GetFredSnapCounty("arkansas").Result;
            Console.WriteLine(getFredSnapCounty);

            // Get fred data by country and page
            Console.WriteLine("\n**********Get federal reserve by country and page**********");
            var getFredSnapCountryPage = GetFredSnapCountryPage("united states", 2).Result;
            Console.WriteLine(getFredSnapCountryPage);

            // Get fred historical by symbol 
            Console.WriteLine("\n**********Get federal reserve historical by symbol**********");
            var getFredHistorical = GetFredHistorical( "RACEDISPARITY005007").Result;
            Console.WriteLine(getFredHistorical);

            // Get fred historical by symbols 
            Console.WriteLine("\n**********Get federal reserve historical by symbols**********");
            var getFredHistoricalSymbols = GetFredHistoricalSymbols(new string[] { "RACEDISPARITY005007", "2020RATIO002013" }).Result;
            Console.WriteLine(getFredHistoricalSymbols);

            Console.ReadLine();
        }

        /// <summary>
        /// get fred states
        /// </summary>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetFredStates()
        {
            return await HttpRequester("/fred/states");
        }

        /// <summary>
        /// get fred counties
        /// </summary>
        /// <param name="county">county</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetFredCounty(string county)
        {
            return await HttpRequester($"/fred/counties/{county}");
        }

        /// <summary>
        /// get fred by symbol
        /// </summary>
        /// <param name="symbol">symbol</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetFredSymbol(string symbol)
        {
            return await HttpRequester($"/fred/snapshot/symbol/{symbol}");
        }

        /// <summary>
        /// get fred by url
        /// </summary>
        /// <param name="url">url</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetFredUrl(string url)
        {
            return await HttpRequester($"/fred/snapshot/url?url={url}");
        }

        /// <summary>
        /// get fred by country
        /// </summary>
        /// <param name="country">country</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetFredSnapCountry(string country)
        {
            return await HttpRequester($"/fred/snapshot/country/{country}");
        }

        /// <summary>
        /// get fred by county
        /// </summary>
        /// <param name="county">county</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetFredSnapCounty(string county)
        {
            return await HttpRequester($"/fred/snapshot/county/{county}");
        }

        /// <summary>
        /// get fred by state
        /// </summary>
        /// <param name="state">state</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetFredSnapState(string state)
        {
            return await HttpRequester($"/fred/snapshot/state/{state}");
        }

        /// <summary>
        /// Get comtrade by country and page number
        /// </summary>
        /// <param name="country">country</param>
        /// <param name="page_number">pagination</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetFredSnapCountryPage(string country, int page_number)
        {

            return await HttpRequester($"/fred/snapshot/country/{country}/{page_number}");
        }


        /// <summary>
        /// Get historical by symbol
        /// </summary>
        /// <param name="symbol">symbol</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetFredHistorical(string symbol)
        {

            return await HttpRequester($"/fred/historical/{ symbol}");
        }

        /// <summary>
        /// Get historical by symbols
        /// </summary>
        /// <param name="symbols">symbols</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetFredHistoricalSymbols(string[] symbols)
        {

            return await HttpRequester($"/fred/historical/{string.Join(",", symbols)}");
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