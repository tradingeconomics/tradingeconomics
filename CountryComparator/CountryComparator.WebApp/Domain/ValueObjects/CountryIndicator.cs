namespace CountryComparator.WebApp.Domain.ValueObjects;

public record CountryIndicator(
    string Country,
    string Indicator,
    string? Unit,
    decimal? LatestValue
);