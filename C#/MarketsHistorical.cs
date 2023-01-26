using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace CSharpExamples
{
    class MarketsHistorical
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

            // get historical markets data by market
            Console.WriteLine("\n**********Get historical markets data by symbol**********");
            var getHistoricalBySymbol = GetHistoricalBySymbol("aapl:us").Result;
            Console.WriteLine(getHistoricalBySymbol);

            // get historical markets data by multiple markets
            Console.WriteLine("\n**********Get historical markets data by multiple symbols**********");
            var getHistoricalBySymbols = GetHistoricalBySymbols(new string[] { "aapl:us", "gac:com" }).Result;
            Console.WriteLine(getHistoricalBySymbols);

            // get historical markets data within a date interval
            Console.WriteLine("\n**********Get historical markets data between dates**********");
            var getHistoricalSymbolBetweenDates = GetHistoricalSymbolBetweenDates("aapl:us", new DateTime(2015, 03, 01), new DateTime(2015, 12, 31)).Result;
            Console.WriteLine(getHistoricalSymbolBetweenDates);

            Console.ReadLine();
        }

        /// <summary>
        /// Get markets historical data by symbol
        /// </summary>
        /// <param name="symbol">symbol</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetHistoricalBySymbol(string symbol)
        {
            return await HttpRequester($"/markets/historical/{symbol}");
        }

        /// <summary>
        /// Get a list of symbols
        /// </summary>
        /// <param name="symbols">Name of the symbols</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetHistoricalBySymbols(string[] symbols)
        {
            return await HttpRequester($"/markets/historical/{string.Join(",", symbols)}");
        }


        /// <summary>
        /// Get historical markets data by symbol, start and end date
        /// </summary>
        /// <param name="symbol">symbol</param>
        /// <param name="startDate">Start date</param>
        /// <param name="endDate">End date</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetHistoricalSymbolBetweenDates(string symbol, DateTime? startDate = null, DateTime? endDate = null)
        {
            
            return await HttpRequester($"/markets/historical/{symbol}?{startDate.Value.ToString("yyyy-MM-dd")}/{endDate.Value.ToString("yyyy-MM-dd")}");
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