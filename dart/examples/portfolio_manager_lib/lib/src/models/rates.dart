class FxRates {
  final Map<String, Map<String, double>> rates;

  const FxRates({required this.rates});

  factory FxRates.fromJson(Map<String, dynamic> json) {
    return FxRates(
      rates: json.map(
        (from, conversions) => MapEntry(
          from,
          (conversions as Map<String, dynamic>).map(
            (to, rate) => MapEntry(to, (rate as num).toDouble()),
          ),
        ),
      ),
    );
  }

  double? rate(String from, String to) => rates[from]?[to];
}
