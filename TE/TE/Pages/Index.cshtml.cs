using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace TE.Pages
{
    public class IndexModel : PageModel
    {
        
        static readonly HttpClient client = new HttpClient();

        private readonly ILogger<IndexModel> _logger;

    //    public IEnumerable<Nation> Nations { get; set; }

        public IndexModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }


        public void OnGet()
        {
            var task = client.GetAsync("https://api.tradingeconomics.com/historical/country/mexico/indicator/gdp?c=guest:guest&f=json");
            HttpResponseMessage result = task.Result;
            List<Nation> nations = new List<Nation>();
            if (result.IsSuccessStatusCode)
            {
                Task<string> readString = result.Content.ReadAsStringAsync();
                string jsonString = readString.Result;
                nations =   Nation.FromJson(jsonString);
            }
          ViewData["Nations"] = nations;


           
        }
    }
}