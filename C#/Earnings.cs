using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace CSharpExamples
{
    class Earnings
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

            // get default earnings calendar
            Console.WriteLine("\n**********Get earnings calendar**********");
            var getEarnings = GetEarnings().Result;
            Console.WriteLine(getEarnings);

            // Filter earnings calendar by date
            Console.WriteLine("\n**********Get earnings calendar by date**********");
            var getEarningsByDate = GetEarningsByDate( new DateTime(2015, 01, 01)).Result;
            Console.WriteLine(getEarningsByDate);

            // Get earnings calendar by market and date
            Console.WriteLine("\n**********Get earnings calendar by market and date**********");
            var getEarningsByMarketDate = GetEarningsByMarketDate("aapl:us", new DateTime(2015, 03, 01)).Result;
            Console.WriteLine(getEarningsByMarketDate);
         
            // Get earnings calendar by market and date range
            Console.WriteLine("\n**********Get earnings calendar by market and date range**********");
            var getEarningsMarketBetweenDates = GetEarningsMarketBetweenDates("aapl:us", new DateTime(2015, 03, 01), new DateTime(2015, 12, 31)).Result;
            Console.WriteLine(getEarningsMarketBetweenDates);

            // get default earnings calendar by country
            Console.WriteLine("\n**********Get earnings calendar by country**********");
            var getEarningsByCountry = GetEarningsByCountry("united states").Result;
            Console.WriteLine(getEarningsByCountry);

            // Filter earnings by type
            // Type can be:earnings, ipo, dividends
            Console.WriteLine("\n**********Get earnings by type**********");
            var getEarningsByType = GetEarningsByType("earnings").Result;
            Console.WriteLine(getEarningsByType);

            Console.ReadLine();
        }

        /// <summary>
        /// get earnings calendar
        /// </summary>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetEarnings()
        {
            return await HttpRequester("/earnings");
        }

        /// <summary>
        /// Filter earnings by date
        /// </summary>
        /// <param name="startDate">Start date if needed</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetEarningsByDate(DateTime? startDate)
        {

            return await HttpRequester($"/earnings?d1={startDate.Value.ToString("yyyy-MM-dd")}");

        }


        /// <summary>
        /// Get earnings by market, and start date
        /// </summary>
        /// <param name="symbol">symbol</param>
        /// <param name="startDate">Start date</param>
        /// <param name="endDate">End date</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetEarningsByMarketDate(string symbol, DateTime? startDate = null)
        {

            return await HttpRequester($"/earnings/symbol/{symbol}?d1={startDate.Value.ToString("yyyy-MM-dd")}");
        }

        /// <summary>
        /// Get earnings by market, start and end date
        /// </summary>
        /// <param name="symbol">symbol</param>
        /// <param name="startDate">Start date</param>
        /// <param name="endDate">End date</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetEarningsMarketBetweenDates(string symbol, DateTime? startDate = null, DateTime? endDate = null)
        {

            return await HttpRequester($"/earnings/symbol/{symbol}?d1={startDate.Value.ToString("yyyy-MM-dd")}&d2={endDate.Value.ToString("yyyy-MM-dd")}");
        }

        /// <summary>
        /// Get earnings by country
        /// </summary>
        /// <param name="country">symbol</param>
        /// <param name="startDate">Start date</param>
        /// <param name="endDate">End date</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetEarningsByCountry(string country)
        {

            return await HttpRequester($"/earnings/country/{country}");
        }

        /// <summary>
        /// Get earnings by type
        /// </summary>
        /// <param name="type">symbol</param>
        /// <param name="startDate">Start date</param>
        /// <param name="endDate">End date</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetEarningsByType(string type)
        {

            return await HttpRequester($"/earnings?type={type}");
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