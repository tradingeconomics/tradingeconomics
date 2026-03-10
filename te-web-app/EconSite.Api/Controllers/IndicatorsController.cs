using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/indicators")]
public class IndicatorsController : ControllerBase
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _config;

    public IndicatorsController(IHttpClientFactory httpClientFactory, IConfiguration config)
    {
        _httpClientFactory = httpClientFactory;
        _config = config;
    }

    [HttpGet("{country}")]
    public async Task<IActionResult> GetIndicators(string country)
    {
        var apiKey = _config["TradingEconomics:ApiKey"];

        var client = _httpClientFactory.CreateClient();

        var url = $"https://api.tradingeconomics.com/country/{country}?c={apiKey}";

        var response = await client.GetAsync(url);

        if (!response.IsSuccessStatusCode)
            return StatusCode((int)response.StatusCode);

        var data = await response.Content.ReadAsStringAsync();

        return Content(data, "application/json");
    }
}