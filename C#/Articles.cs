using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace CSharpExamples
{
    class Articles
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

            // get lastest articles
            Console.WriteLine("**********Get lastest Articles**********");
            var getArticles = GetArticles().Result;
            Console.WriteLine(getArticles);

            // get lastest articles by country, or countries
            Console.WriteLine("**********Get lastest articles by country**********");
            var getArticlesByCountry = GetArticlesByCountry(new string[] { "united states" }).Result;
            Console.WriteLine(getArticlesByCountry);

            // get lastest articles by country, or countries within a date interval
            Console.WriteLine("**********Get lastest articles by country and dates**********");
            var getArticlesByCountryDate = GetArticlesByCountryDate(new string[] { "united states" }, new DateTime(2015, 03, 01), new DateTime(2015, 12, 31)).Result;
            Console.WriteLine(getArticlesByCountryDate);

            // Get latest articles by indicator, or indicators
            Console.WriteLine("**********Get latest articles by indicator**********");
            var getArticlesByIndicator = GetArticlesByIndicator(new string[] { "inflation rate" }).Result;
            Console.WriteLine(getArticlesByIndicator);

            // Get articles by country and indicator, or countries and indicators
            Console.WriteLine("**********Get articles by country and indicator**********");
            var getArticlesCountryIndicator = GetArticlesCountryIndicator(new string[] { "united states" }, new string[] { "inflation rate" }).Result;
            Console.WriteLine(getArticlesCountryIndicator);

            // Paginate articles list by specifying start index and list size
            Console.WriteLine("**********Get start index and list size**********");
            var getArticlesList = GetArticlesList(4, 2).Result;
            Console.WriteLine(getArticlesList);

            // Get articles by id
            Console.WriteLine("**********Get articles by id**********");
            var getArticlesId = GetArticlesId(20580).Result;
            Console.WriteLine(getArticlesId);


            Console.ReadLine();
        }

        /// <summary>
        /// get latest articles
        /// </summary>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetArticles()
        {
            return await HttpRequester("/articles");
        }

        /// <summary>
        /// Filter news by country
        /// </summary>
        /// <param name="countries">country</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetArticlesByCountry(string[] countries)
        {

            return await HttpRequester($"/articles/country/{string.Join(",", countries)}");

        }

        /// </summary>
        /// Filter news by country and dates
        /// <param name="countries">country</param>
        /// <param name="startDate">Start date</param>
        /// <param name="endDate">End date</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetArticlesByCountryDate(string[] countries, DateTime? startDate = null, DateTime? endDate = null)
        {

            return await HttpRequester($"/articles/country/{string.Join(",", countries)}/from/{startDate.Value.ToString("yyyy-MM-dd")}/{endDate.Value.ToString("yyyy-MM-dd")}");
        }

        /// <summary>
        /// Filter articles by indicator
        /// </summary>   
        /// <param name="indicators">indicatord</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetArticlesByIndicator(string[] indicators)
        {

            return await HttpRequester($"/articles/indicator/{string.Join(",", indicators)}");

        }

        /// <summary>
        /// Filter articles by country and indicator
        /// </summary>
        /// <param name="countries">country</param>
        /// <param name="indicators">indicator</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetArticlesCountryIndicator(string[] countries, string[] indicators)
        {

            return await HttpRequester($"/articles/country/{string.Join(",", countries)}/{string.Join(",", indicators)}");

        }

        /// <summary>
        /// get latest articles start index and limit size list
        /// </summary>
        /// <param name="list_size">list size</param>
        /// <param name="start_index">Start index</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetArticlesList(int list_size, int start_index)
        {
            return await HttpRequester($"/articles?lim={list_size}&start={start_index}");
        }

        /// <summary>
        /// get latest articles by id
        /// </summary>
        /// <param name="id">id</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetArticlesId(int id)
        {
            return await HttpRequester($"/articles/id/{id}");
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