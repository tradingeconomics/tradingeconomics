using CountryComparator.WebApp.Domain.ValueObjects;

namespace CountryComparator.WebApp.Domain.Services;

public interface ITradingEconomicsService
{
    IReadOnlySet<string> GetAllCountriesSortedByName();

    public Task<IReadOnlyList<CountryIndicator>> GetIndicators(IReadOnlySet<string> countries);
}
