using System.Text.Json.Serialization;
using CountryComparator.WebApp.Domain.Services;
using CountryComparator.WebApp.Domain.ValueObjects;

namespace CountryComparator.WebApp.Infrastructure.HttpClients;

public class TradingEconomicsHttpClient : ITradingEconomicsService
{
    private readonly HttpClient _client;
    private readonly string _apiKey;

    public TradingEconomicsHttpClient(HttpClient client, IConfiguration configuration)
    {
        _client = client;
        _apiKey = configuration["TradingEconomics:ApiKey"] ??
                  throw new Exception("TradingEconomics API Key not found in configuration");
    }

    public IReadOnlySet<string> GetAllCountriesSortedByName()
    {
        // List of countries available on the free plan
        var countries = new SortedSet<string>
        {
            "Sweden",
            "Mexico",
            "New Zealand",
            "Thailand"
        };
        return countries;
    }

    public async Task<IReadOnlyList<CountryIndicator>> GetIndicators(IReadOnlySet<string> countries)
    {
        var parameterCountries = string.Join(",", countries);
        var response = await _client.GetAsync($"/country/{parameterCountries}?c={_apiKey}&f=json");
        var indicatorsDto = await response.Content.ReadFromJsonAsync<IList<IndicatorDto>>();

        if (indicatorsDto == null || indicatorsDto.Count == 0) return new List<CountryIndicator>();

        var countryIndicators = indicatorsDto
            .Where(dto => dto.Country != null && dto.Category != null)
            .Select(dto => new CountryIndicator(dto.Country!, dto.Category!, dto.Unit, dto.LatestValue))
            .ToList();
        return countryIndicators;
    }
}

internal record IndicatorDto(
    string? Country,
    string? Category,
    string? Title,
    string? LatestValueDate,
    decimal? LatestValue,
    string? Source,
    [property: JsonPropertyName("SourceURL")]
    string? SourceUrl,
    string? Unit,
    [property: JsonPropertyName("URL")] string? Url,
    string? CategoryGroup,
    string? Adjustment,
    string? Frequency,
    string? HistoricalDataSymbol,
    string? CreateDate,
    string? FirstValueDate,
    decimal? PreviousValue,
    string? PreviousValueDate
);
