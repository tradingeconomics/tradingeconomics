using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;


namespace CSharpExamples
{
    class LatestUpdates
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

            // get a list of the lastest updates
            Console.WriteLine("\n***********Get the latest updates***********");
            var getLatestUpdates = GetLatestUpdates().Result;
            Console.WriteLine(getLatestUpdates);

            // get latest updates since a specific date
            Console.WriteLine("\n***********About to get latest updates by a specific date***********");
            var getLatestUpdatesByDate = GetLatestUpdatesByDate(new DateTime(2015, 03, 01)).Result;
            Console.WriteLine(getLatestUpdatesByDate);

            Console.ReadLine();
        }

        /// <summary>
        /// Get latest updates with no filters
        /// </summary>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetLatestUpdates()
        {
            return await HttpRequester("/updates");
        }

        /// <summary>
        /// Get latest updates by date
        /// </summary>
        /// <param name="startDate">Start date if needed</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetLatestUpdatesByDate(DateTime startDate)
        {
            return await HttpRequester($"/updates/{startDate.ToString("yyyy-MM-dd")}");
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
