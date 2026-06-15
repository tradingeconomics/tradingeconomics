class Account {
  final int accountId;
  final String owner;
  final String email;
  final String phone;
  final String country;
  final String address;
  final String creationDate;
  final bool premium;
  final String currency;
  final List<Map<String, dynamic>> positions;
  final Map<String, double> cashBalances;

  const Account({
    required this.accountId,
    required this.currency,
    required this.owner,
    required this.premium,
    required this.email,
    required this.creationDate,
    required this.phone,
    required this.country,
    required this.address,
    required this.positions,
    required this.cashBalances,
  });

  factory Account.fromJson(Map<String, dynamic> json) {
    final account = json['account'] as Map<String, dynamic>;
    final positions = (json['positions'] as List<dynamic>? ?? [])
        .cast<Map<String, dynamic>>();

    final cashBalances = (json['cash_balances'] as Map<String, dynamic>? ?? {})
        .map(
          (key, value) => MapEntry(
            key,
            value is num
                ? value.toDouble()
                : double.tryParse(value.toString()) ?? 0.0,
          ),
        );

    return Account(
      accountId: account['account_id'],
      currency: account['currency'],
      owner: account['owner'],
      email: account['email'],
      phone: account['phone'],
      creationDate: account['created_at'],
      premium: account['is_premium'],
      country: account['country'],
      address: account['address'],
      positions: positions,
      cashBalances: cashBalances,
    );
  }
}
