using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace CSharpExamples
{
    class WBCategory
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

            // get world bank categories
            Console.WriteLine("\n**********Get world bank categories**********");
            var getWB = GetWB().Result;
            Console.WriteLine(getWB);

            // Filtering by category
            Console.WriteLine("\n**********Get WB by category**********");
            var getWBCategory = GetWBCategory( "Education" ).Result;
            Console.WriteLine(getWBCategory);

            // Filtering by the category and page number
            Console.WriteLine("\n**********Get WB by category and page number**********");
            var getWBCategoryPage = GetWBCategoryPage("Education", 4).Result;
            Console.WriteLine(getWBCategoryPage);
       

            Console.ReadLine();
        }

        /// <summary>
        /// get main categories
        /// </summary>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetWB()
        {
            return await HttpRequester("/worldBank/categories");
        }

        /// <summary>
        /// Filter by category
        /// </summary>
        /// <param name="category">category</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetWBCategory(string category)
        {

            return await HttpRequester($"/worldBank/category/{category}");

        }


        /// <summary>
        /// Get WB by category and page number
        /// </summary>
        /// <param name="category">category</param>
        /// <param name="page_number">pagination</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetWBCategoryPage(string category, int page_number)
        {

            return await HttpRequester($"/worldBank/category/{category}/{page_number}");
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