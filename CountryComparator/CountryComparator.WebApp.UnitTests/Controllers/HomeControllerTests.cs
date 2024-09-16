using CountryComparator.WebApp.Controllers;
using CountryComparator.WebApp.Domain.Services;
using CountryComparator.WebApp.Domain.ValueObjects;
using CountryComparator.WebApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;

namespace CountryComparator.WebApp.UnitTests.Controllers;

public class HomeControllerTests
{
    [Fact]
    public async Task Index_ReturnsViewResult_WithAvailableCountriesAndDefaultValues()
    {
        // Arrange
        var availableCountries = new SortedSet<string>(["Mexico", "Sweden", "New Zealand"]);
        var loggerMock = new Mock<ILogger<HomeController>>();
        var tradingEconomicsServiceMock = new Mock<ITradingEconomicsService>();
        tradingEconomicsServiceMock.Setup(service => service.GetAllCountriesSortedByName())
            .Returns(availableCountries);
        var controller = new HomeController(loggerMock.Object, tradingEconomicsServiceMock.Object);

        // Act
        var result = await controller.Index(null, null);

        // Assert
        var viewResult = Assert.IsType<ViewResult>(result);
        var model = Assert.IsAssignableFrom<CountryComparatorViewModel>(viewResult.ViewData.Model);
        Assert.Null(model.CountryA);
        Assert.Null(model.CountryB);
        Assert.Equal(availableCountries.Count, model.CountryAOptions.Count(item => availableCountries.Contains(item.Value)));
        Assert.Equal(availableCountries.Count, model.CountryBOptions.Count(item => availableCountries.Contains(item.Value)));
        Assert.Empty(model.Indicators);
    }

    [Fact]
    public async Task Index_ReturnsViewResult_WithIndicators_WhenCountriesProvided()
    {
        // Arrange
        var availableCountries = new SortedSet<string>(["Mexico", "Sweden", "New Zealand"]);
        var expectedCountryIndicators = new List<CountryIndicator>
        {
            new CountryIndicator("Sweden", "Asylum Applications", "persons", 500),
            new CountryIndicator("New Zealand", "Asylum Applications", "persons", 400),
        };
        var loggerMock = new Mock<ILogger<HomeController>>();
        var tradingEconomicsServiceMock = new Mock<ITradingEconomicsService>();
        tradingEconomicsServiceMock.Setup(service => service.GetAllCountriesSortedByName())
            .Returns(availableCountries);
        tradingEconomicsServiceMock.Setup(service => service.GetIndicators(It.IsAny<SortedSet<string>>()))
            .ReturnsAsync(expectedCountryIndicators);
        var controller = new HomeController(loggerMock.Object, tradingEconomicsServiceMock.Object);

        // Act
        var result = await controller.Index("Sweden", "New Zealand");

        // Assert
        var viewResult = Assert.IsType<ViewResult>(result);
        var model = Assert.IsAssignableFrom<CountryComparatorViewModel>(viewResult.ViewData.Model);
        Assert.Equal("Sweden", model.CountryA);
        Assert.Equal("New Zealand", model.CountryB);
        Assert.Equal(availableCountries.Count, model.CountryAOptions.Count(item => availableCountries.Contains(item.Value)));
        Assert.Equal(availableCountries.Count, model.CountryBOptions.Count(item => availableCountries.Contains(item.Value)));
        Assert.NotEmpty(model.Indicators);
    }
}