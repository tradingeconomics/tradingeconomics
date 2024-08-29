using System.Net;
using System.Text.Json;
using CountryComparator.WebApp.Infrastructure.HttpClients;
using Microsoft.Extensions.Configuration;
using Moq;
using RichardSzalay.MockHttp;

namespace CountryComparator.WebApp.UnitTests.Infrastructure.HttpClients;

public class TradingEconomicsHttpClientTests
{
    [Fact]
    public async Task GetIndicators_ReturnsCountryIndicators_WhenApiResponseIsValid()
    {
        // Arrange
        var countries = new HashSet<string> { "Mexico", "Sweden" };
        var responseContent = 
            """
            [
                {
                    "Country": "Sweden",
                    "Category": "Asylum Applications",
                    "Title": "Sweden Asylum Applications",
                    "LatestValueDate": "2024-06-30T00:00:00",
                    "LatestValue": 485,
                    "Source": "EUROSTAT",
                    "SourceURL": "https://ec.europa.eu/eurostat/",
                    "Unit": "persons",
                    "URL": "/sweden/asylum-applications",
                    "CategoryGroup": "Government",
                    "Adjustment": "",
                    "Frequency": "Monthly",
                    "HistoricalDataSymbol": "SwedenAsyApp",
                    "CreateDate": "2015-09-06T15:26:00",
                    "FirstValueDate": "2008-01-31T00:00:00",
                    "PreviousValue": 545,
                    "PreviousValueDate": "2024-05-31T00:00:00"
                },
                {
                    "Country": "Mexico",
                    "Category": "Asylum Applications",
                    "Title": "Mexico Asylum Applications",
                    "LatestValueDate": "2024-06-30T00:00:00",
                    "LatestValue": 500,
                    "Source": "MEXICOSTAT",
                    "SourceURL": "https://ec.europa.eu/eurostat/",
                    "Unit": "persons",
                    "URL": "/mexico/asylum-applications",
                    "CategoryGroup": "Government",
                    "Adjustment": "",
                    "Frequency": "Monthly",
                    "HistoricalDataSymbol": "MexicoAsyApp",
                    "CreateDate": "2015-09-06T15:26:00",
                    "FirstValueDate": "2008-01-31T00:00:00",
                    "PreviousValue": 400,
                    "PreviousValueDate": "2024-05-31T00:00:00"
                }
            ]
            """;
        var mockHttp = new MockHttpMessageHandler();
        mockHttp.When("/country/Mexico,Sweden")
            .WithQueryString("c", "test_api_key")
            .WithQueryString("f", "json")
            .Respond("application/json", responseContent);
        var client = mockHttp.ToHttpClient();
        client.BaseAddress = new Uri("https://api.tradingeconomics.com");
        
        var mockConfiguration = new Mock<IConfiguration>();
        mockConfiguration.Setup(c => c["TradingEconomics:ApiKey"]).Returns("test_api_key");
        
        var tradingEconomicsHttpClient = new TradingEconomicsHttpClient(client, mockConfiguration.Object);
        
        // Act
        var indicators = await tradingEconomicsHttpClient.GetIndicators(countries);
        
        // Assert
        Assert.NotNull(indicators);
        Assert.Equal(2, indicators.Count);
        Assert.Contains(indicators, ci => ci.Country == "Mexico" && ci.Indicator == "Asylum Applications" && ci.LatestValue == 500);
        Assert.Contains(indicators, ci => ci.Country == "Sweden" && ci.Indicator == "Asylum Applications" && ci.LatestValue == 485);
    }

    [Fact]
    public async Task GetIndicators_ReturnsEmptyList_WhenApiResponseIsEmpty()
    {
        // Arrange
        var countries = new HashSet<string> { "Mexico", "Sweden" };

        var mockConfiguration = new Mock<IConfiguration>();
        mockConfiguration.Setup(c => c["TradingEconomics:ApiKey"]).Returns("test_api_key");
        
        var mockHttp = new MockHttpMessageHandler();
        mockHttp.When("/country/Mexico,Sweden")
            .WithQueryString("c", "test_api_key")
            .WithQueryString("f", "json")
            .Respond("application/json", "[]");
        var client = mockHttp.ToHttpClient();
        client.BaseAddress = new Uri("https://api.tradingeconomics.com");
        
        var tradingEconomicsHttpClient = new TradingEconomicsHttpClient(client, mockConfiguration.Object);

        // Act
        var result = await tradingEconomicsHttpClient.GetIndicators(countries);

        // Assert
        Assert.NotNull(result);
        Assert.Empty(result);
    }

    [Fact]
    public async Task GetIndicators_ThrowsException_WhenApiResponseIsNotFound()
    {
        // Arrange
        var countries = new HashSet<string> { "Mexico", "Sweden" };
        
        var mockConfiguration = new Mock<IConfiguration>();
        mockConfiguration.Setup(c => c["TradingEconomics:ApiKey"]).Returns("test_api_key");
            
        var mockHttp = new MockHttpMessageHandler();
        mockHttp.When("/country/Mexico,Sweden")
            .WithQueryString("c", "test_api_key")
            .WithQueryString("f", "json")
            .Respond(HttpStatusCode.NotFound);
        var client = mockHttp.ToHttpClient();
        client.BaseAddress = new Uri("https://api.tradingeconomics.com");
            
        var tradingEconomicsHttpClient = new TradingEconomicsHttpClient(client, mockConfiguration.Object);

        // Act & Assert
        await Assert.ThrowsAsync<JsonException>(() => tradingEconomicsHttpClient.GetIndicators(countries));
    }
}
