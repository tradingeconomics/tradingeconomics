using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace CSharpExamples
{
    class MarketsIntraday
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

            // get Intraday prices for a single market
            Console.WriteLine("\n**********Get Intraday prices for a single market**********");
            var getIntradaySymbol = GetIntradaySymbol("aapl:us").Result;
            Console.WriteLine(getIntradaySymbol);

            // Filter intraday prices by date and hour
            Console.WriteLine("\n**********Get intraday prices by date and hour**********");
            var getIntradayDateHour = GetIntradayDateHour("aapl:us", new DateTime(2017, 08, 10, 15, 30, 0)).Result;
            Console.WriteLine(getIntradayDateHour);

            // Filter intraday prices by date
            Console.WriteLine("\n**********Get intraday data by symbol between dates**********");
            var getIntradaySymbolDates = GetIntradaySymbolDates("aapl:us", new DateTime(2015, 03, 01), new DateTime(2015, 12, 31)).Result;
            Console.WriteLine(getIntradaySymbolDates);

            Console.ReadLine();
        }

        /// <summary>
        /// get Intraday prices for a single market
        /// </summary>
        /// <param name="symbol">symbol</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetIntradaySymbol(string symbol)
        {
            return await HttpRequester($"/markets/intraday/{symbol}");
        }

        /// <summary>
        /// Filter intraday prices by date and hour
        /// </summary>
        /// <param name="symbol">symbol</param>
        /// <param name="startDate">Start date if needed</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetIntradayDateHour(string symbol, DateTime? startDate)
        {

            return await HttpRequester($"/markets/intraday/{symbol}?{startDate.Value.ToString("yyyy-MM-dd %h")}");

        }


        /// <summary>
        /// Get historical markets data by symbol, start and end date
        /// </summary>
        /// <param name="symbol">symbol</param>
        /// <param name="startDate">Start date</param>
        /// <param name="endDate">End date</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetIntradaySymbolDates(string symbol, DateTime? startDate = null, DateTime? endDate = null)
        {

            return await HttpRequester($"/markets/intraday/{symbol}?{startDate.Value.ToString("yyyy-MM-dd")}/{endDate.Value.ToString("yyyy-MM-dd")}");
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