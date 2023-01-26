using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace CSharpExamples
{
    class Calendar
    {
        /// <summary>
        /// Store the client key to be used through the program
        /// </summary>
        static string _clientKey = "guest:guest";

        static void Main(string[] args)
        {
            // set the client key
            Console.WriteLine("\nProvide a API key; otherwise, press ENTER to use the default test key...");

            string k = Console.ReadLine();
            if (!string.IsNullOrWhiteSpace(k))
                _clientKey = k;

            // get  calendar events
            Console.WriteLine("\nAbout to get calendar events");
            var getCalendarResult = GetCalendarEvents().Result;
            Console.WriteLine(getCalendarResult);

            // get calendar events between two dates
            Console.WriteLine("\nAbout to get all calendar events between dates");
            var getCalendarBetweenDatesResult = GetCalendarEventsByDate(new DateTime(2016, 12, 02), new DateTime(2016, 12, 03)).Result;
            Console.WriteLine(getCalendarBetweenDatesResult);

            // get  calendar events for a specific country
            Console.WriteLine("\nAbout to get calendar events for a specific country");
            var getCalendarForCountryResult = GetCalendarEventsByCountries("united states").Result;
            Console.WriteLine(getCalendarForCountryResult);

            // get calendar events for a set of countries
            Console.WriteLine("\nAbout to get calendar events for a set of countries");
            var getCalendarForCountriesResult = GetCalendarEventsByCountries("united states", "china").Result;
            Console.WriteLine(getCalendarForCountriesResult);

            // get calendar events by country/countries and dates
            Console.WriteLine("\nAbout to get calendar events by date and countries");
            var getCalendarForCountriesAndDatesResult = GetCalendarEventsByCountriesAndDates(new DateTime(2016, 02, 01), new DateTime(2016, 02, 10), "united states", "china").Result;
            Console.WriteLine(getCalendarForCountriesAndDatesResult);

            // get calendar events by indicator
            Console.WriteLine("\nAbout to get calendar events by economics indicator");
            var getCalendarForIndicatorResult = GetCalendarEventsByIndicator("inflation rate").Result;
            Console.WriteLine(getCalendarForIndicatorResult);

            // get calendar events by indicator and dates
            Console.WriteLine("\nAbout to get calendar events by economics indicator and dates");
            var getCalendarForIndicatorAndDatesResult = GetCalendarEventsByIndicatorAndDates(new DateTime(2016, 03, 01), new DateTime(2016, 03, 03), "inflation rate").Result;
            Console.WriteLine(getCalendarForIndicatorAndDatesResult);

            // get calendar events by indicator, countries and dates
            Console.WriteLine("\nAbout to get calendar events by economics indicator, countries and dates");
            var getCalendarForIndicatorCountriesAndDatesResult = GetCalendarEventsByIndicatorCountriesAndDates(new DateTime(2016, 12, 01), new DateTime(2017, 02, 25), new string[] { "united states" }, "initial jobless claims").Result;
            Console.WriteLine(getCalendarForIndicatorCountriesAndDatesResult);

            // get calendar events by id
            Console.WriteLine("\nAbout to get calendar events by id");
            var getCalendarByIdResult = GetCalendarEventsById(174108, 160025, 160030).Result;
            Console.WriteLine(getCalendarByIdResult);

            Console.ReadLine();
        }

        /// <summary>
        /// Get all calendar events without filters
        /// </summary>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetCalendarEvents()
        {
            return await HttpRequester("/calendar");
        }

        /// <summary>
        /// Get all calendar events between dates
        /// </summary>
        /// <param name="startDate">Begining of the period</param>
        /// <param name="endDate">End of the period</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetCalendarEventsByDate(DateTime startDate, DateTime endDate)
        {
            if (startDate == DateTime.MinValue || startDate == DateTime.MaxValue ||
                endDate == DateTime.MinValue || endDate == DateTime.MaxValue)
                return "Dates aren't properly defined";

            string textStartDate = startDate.ToString("yyyy-MM-dd");
            string textEndDate = endDate.ToString("yyyy-MM-dd");

            return await HttpRequester($"/calendar/country/all/{textStartDate}/{textEndDate}");
        }

        /// <summary>
        /// Get calendar events for multiple countries
        /// </summary>
        /// <param name="countries">Array with the names of the requested countries</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetCalendarEventsByCountries(params string[] countries)
        {
            foreach (var country in countries)
                if (string.IsNullOrWhiteSpace(country))
                    return "Countries aren't properly defined";

            return await HttpRequester($"/calendar/country/{string.Join(",", countries)}");
        }

        /// <summary>
        /// Get calendar events between dates given a set of countries
        /// </summary>
        /// <param name="startDate">Begining of the period</param>
        /// <param name="endDate">End of the period</param>
        /// <param name="countries">Array with the names of the requested countries</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetCalendarEventsByCountriesAndDates(DateTime startDate, DateTime endDate, params string[] countries)
        {
            if (startDate == DateTime.MinValue || startDate == DateTime.MaxValue ||
                endDate == DateTime.MinValue || endDate == DateTime.MaxValue)
                return "Dates aren't properly defined";

            string textStartDate = startDate.ToString("yyyy-MM-dd");
            string textEndDate = endDate.ToString("yyyy-MM-dd");

            foreach (var country in countries)
                if (string.IsNullOrWhiteSpace(country))
                    return "Countries aren't properly defined";

            return await HttpRequester($"/calendar/country/{string.Join(",", countries)}/{textStartDate}/{textEndDate}");
        }

        /// <summary>
        /// Get calendar events for multiple indicators
        /// </summary>
        /// <param name="indicators">Array with the names of the requested indicators</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetCalendarEventsByIndicator(params string[] indicators)
        {
            foreach (var indicator in indicators)
                if (string.IsNullOrWhiteSpace(indicator))
                    return "Indicatores aren't properly defined";

            return await HttpRequester($"/calendar/indicator/{string.Join(",", indicators)}");
        }

        /// <summary>
        /// Get calendar events for multiple indicators between dates
        /// </summary>
        /// <param name="startDate">Begining of the period</param>
        /// <param name="endDate">End of the period</param>
        /// <param name="indicators">Array with the names of the requested indicators</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetCalendarEventsByIndicatorAndDates(DateTime startDate, DateTime endDate, params string[] indicators)
        {
            if (startDate == DateTime.MinValue || startDate == DateTime.MaxValue ||
                endDate == DateTime.MinValue || endDate == DateTime.MaxValue)
                return "Dates aren't properly defined";

            string textStartDate = startDate.ToString("yyyy-MM-dd");
            string textEndDate = endDate.ToString("yyyy-MM-dd");

            foreach (var indicator in indicators)
                if (string.IsNullOrWhiteSpace(indicator))
                    return "Indicatores aren't properly defined";

            return await HttpRequester($"/calendar/indicator/{string.Join(",", indicators)}/{textStartDate}/{textEndDate}");
        }

        /// <summary>
        /// Get calendar events for multiple countries and indicators between dates
        /// </summary>
        /// <param name="startDate">Begining of the period</param>
        /// <param name="endDate">End of the period</param>
        /// <param name="countries">Array with the names of the requested countries</param>
        /// <param name="indicators">Array with the names of the requested indicators</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetCalendarEventsByIndicatorCountriesAndDates(DateTime startDate, DateTime endDate, string[] countries, params string[] indicators)
        {
            if (startDate == DateTime.MinValue || startDate == DateTime.MaxValue ||
                endDate == DateTime.MinValue || endDate == DateTime.MaxValue)
                return "Dates aren't properly defined";

            string textStartDate = startDate.ToString("yyyy-MM-dd");
            string textEndDate = endDate.ToString("yyyy-MM-dd");

            foreach (var indicator in indicators)
                if (string.IsNullOrWhiteSpace(indicator))
                    return "Indicatores aren't properly defined";

            foreach (var country in countries)
                if (string.IsNullOrWhiteSpace(country))
                    return "Countries aren't properly defined";

            return await HttpRequester($"/calendar/country/{string.Join(",", countries)}/indicator/{string.Join(",", indicators)}/{textStartDate}/{textEndDate}");
        }

        /// <summary>
        /// Get calendar events given the calendar ID
        /// </summary>
        /// <param name="ids">Array with the requested ids</param>
        /// <returns>A task that will be resolved in a string with the request result</returns>
        public async static Task<string> GetCalendarEventsById(params int[] ids)
        {
            return await HttpRequester($"/calendar/calendarid/{string.Join(",", ids)}");
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
