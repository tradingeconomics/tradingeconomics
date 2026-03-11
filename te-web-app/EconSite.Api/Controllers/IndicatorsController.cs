using System.Buffers.Text;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.Contracts;
using System.Diagnostics.Tracing;
using System.Net;
using System.Net.Sockets;
using System.Net.WebSockets;
using System.Reflection.Metadata;
using System.Runtime.CompilerServices;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;

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
        {
            var error = await response.Content.ReadAsStringAsync();
            return StatusCode((int)response.StatusCode, error);
        }

        var data = await response.Content.ReadAsStringAsync();

        return Content(data, "application/json");
    }

    [HttpGet("historical/{country}/{indicator}")]
    public async Task<IActionResult> GetHistoricalIndicators(string country, string indicator)
    {
        var apiKey = _config["TradingEconomics:ApiKey"];

        var client = _httpClientFactory.CreateClient();

        var url = $"https://api.tradingeconomics.com/historical/country/{country}/indicator/{indicator}?c={apiKey}";

        var response = await client.GetAsync(url);

        if (!response.IsSuccessStatusCode)
        {
            var error = await response.Content.ReadAsStringAsync();
            return StatusCode((int)response.StatusCode, error);
        }

        var data = await response.Content.ReadAsStringAsync();

        return Content(data, "application/json");
    }
}