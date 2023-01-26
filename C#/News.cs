using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace CSharpExamples
{
    class News
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

            // get lastest news
            Console.WriteLine("\n**********Get lastest news**********");
            var getNews = GetNews().Result;
            Console.WriteLine(getNews);

            // get lastest news by country, or countries
            Console.WriteLine("\n**********Get lastest news by country**********");
            var getNewsByCountry = GetNewsByCountry(new string[] { "mexico" }).Result;
            Console.WriteLine(getNewsByCountry);

            // Get latest news by indicator, or indicators
            Console.WriteLine("\n**********Get latest news by indicator**********");
            var getNewsByIndicator = GetNewsByIndicator(new string[] { "inflation rate" }).Result;
            Console.WriteLine(getNewsByIndicator);

            // Get news by country and indicator, or countries and indicators
            Console.WriteLine("\n**********Get news by country and indicator**********");
            var getNewsCountryIndicator = GetNewsCountryIndicator(new string[] { "mexico" }, new string[] { "inflation rate" }).Result;
            Console.WriteLine(getNewsCountryIndicator);

            // Paginate news list by specifying start index and list size
            Console.WriteLine("\n**********Get start index and list size**********");
            var getNewsList = GetNewsList(4, 2).Result;
            Console.WriteLine(getNewsList);


            Console.ReadLine();
        }

        /// <summary>
        /// get latest news
        /// </summary>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetNews()
        {
            return await HttpRequester("/news");
        }

        /// <summary>
        /// Filter news by country
        /// </summary>
        /// <param name="countries">country</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetNewsByCountry(string[] countries)
        {

            return await HttpRequester($"/news/country/{string.Join(",", countries)}");

        }

        /// <summary>
        /// Filter news by indicator
        /// </summary>
        /// <param name="countries">country</param>
        /// <param name="indicators">indicatord</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetNewsByIndicator(string[] indicators)
        {

            return await HttpRequester($"/news/indicator/{string.Join(",", indicators)}");

        }

        /// <summary>
        /// Filter news by country and indicator
        /// </summary>
        /// <param name="indicators">indicator</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetNewsCountryIndicator(string[] countries, string[] indicators)
        {

            return await HttpRequester($"/news/country/{string.Join(",", countries)}/{string.Join(",", indicators)}");

        }

        /// <summary>
        /// get latest news start index and limit size list
        /// </summary>
        /// <param name="list_size">list size</param>
        /// <param name="start_index">Start index</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetNewsList(int list_size, int start_index)
        {
            return await HttpRequester($"/news?limit={list_size}&start={start_index}");
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