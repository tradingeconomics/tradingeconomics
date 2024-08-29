using System.Diagnostics;
using CountryComparator.WebApp.Domain.Services;
using CountryComparator.WebApp.Domain.ValueObjects;
using Microsoft.AspNetCore.Mvc;
using CountryComparator.WebApp.Models;

namespace CountryComparator.WebApp.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly ITradingEconomicsService _tradingEconomicsService;

    public HomeController(ILogger<HomeController> logger, ITradingEconomicsService tradingEconomicsService)
    {
        _logger = logger;
        _tradingEconomicsService = tradingEconomicsService;
    }

    public async Task<IActionResult> Index(string? countryA, string? countryB)
    {
        var availableCountries = _tradingEconomicsService.GetAllCountriesSortedByName();
        IReadOnlyList<CountryIndicator> indicators = new List<CountryIndicator>();

        if (countryA != null && countryB != null)
            indicators = await _tradingEconomicsService.GetIndicators(new SortedSet<string>([countryA, countryB]));

        var viewModel = new CountryComparatorViewModel(countryA, countryB, availableCountries, indicators);
        return View(viewModel);
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}