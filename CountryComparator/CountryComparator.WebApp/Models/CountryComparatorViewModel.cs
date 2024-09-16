using CountryComparator.WebApp.Domain.ValueObjects;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace CountryComparator.WebApp.Models;

public class CountryComparatorViewModel
{
    public string? CountryA { get; set; }
    public string? CountryB { get; set; }
    public IEnumerable<SelectListItem> CountryAOptions { get; set; }
    public IEnumerable<SelectListItem> CountryBOptions { get; set; }
    public IReadOnlyList<CountryIndicator> Indicators { get; set; }

    public CountryComparatorViewModel(
        string? countryA,
        string? countryB,
        IReadOnlySet<string> countries,
        IReadOnlyList<CountryIndicator> indicators
    )
    {
        CountryA = countryA;
        CountryB = countryB;
        CountryAOptions = CreateCountrySelectItems(countries, CountryA);
        CountryBOptions = CreateCountrySelectItems(countries, CountryB);
        Indicators = indicators;
    }

    private static IEnumerable<SelectListItem> CreateCountrySelectItems(IEnumerable<string> countries,
        string? selectedCountry)
    {
        return countries
            .Select(country => new SelectListItem(country, country, country == selectedCountry))
            .ToArray();
    }
}