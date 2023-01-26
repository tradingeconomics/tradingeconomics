using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace CSharpExamples
{
    class Ratings
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

            // get a list of credit ratings
            Console.WriteLine("\n***********Get all ratings***********");
            var getRatings = GetRatings().Result;
            Console.WriteLine(getRatings);

            // get a list of ratings from a country
            Console.WriteLine("\n***********Get a list of ratings of a country***********");
            var getRatingsByCountry = GetRatingsByCountry("mexico").Result;
            Console.WriteLine(getRatingsByCountry);

            // get ratings given countries 
            Console.WriteLine("\n***********Get a list of ratings for multiple countries***********");
            var getRatingsByCountries = GetRatingsByCountries(new string[] { "mexico", "sweden" }).Result;
            Console.WriteLine(getRatingsByCountries);

            // get historical ratings for multiple countries 
            Console.WriteLine("\n***********Get historical data of ratings for multiple countries***********");
            var getHistoricalRatings = GetHistoricalRatings(new string[] { "mexico", "sweden" }).Result;
            Console.WriteLine(getHistoricalRatings);

            Console.ReadLine();
        }

        /// <summary>
        /// Get all ratings without filters
        /// </summary>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetRatings()
        {
            return await HttpRequester("/ratings");
        }

        /// <summary>
        /// Get a list of ratings form a specific country
        /// </summary>
        /// <param name="country">Name of the country</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetRatingsByCountry(string country)
        {
            return await HttpRequester($"/ratings/{country}");
        }

        /// <summary>
        /// Get ratings by countries
        /// </summary>
        /// <param name="countries">Name of the country</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetRatingsByCountries(string[] countries)
        {
            return await HttpRequester($"/ratings/{string.Join(",", countries)}");
        }

        /// <summary>
        /// Get historical ratings given countries
        /// </summary>
        /// <param name="countries">List of countries</param>

        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetHistoricalRatings(string[] countries)
        {

            return await HttpRequester($"/ratings/historical/{string.Join(",", countries)}");
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