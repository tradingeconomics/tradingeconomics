import 'package:flutter/material.dart';
import 'package:portfolio_manager_app/constants/app_constants.dart';
import 'package:portfolio_manager_app/pages/asset_detail_page.dart';
import 'package:portfolio_manager_app/pages/account_page.dart';
import 'package:portfolio_manager_lib/portfolio_manager_lib.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: AppColors.darkBg,
        colorScheme: const ColorScheme.dark(
          primary: AppColors.primaryBlue,
          secondary: AppColors.accent,
          surface: AppColors.cardBg,
        ),
        appBarTheme: const AppBarTheme(
          backgroundColor: AppColors.appBarBg,
          elevation: 0,
        ),
        cardTheme: const CardThemeData(
          color: AppColors.cardBg,
          elevation: 2,
          margin: EdgeInsets.symmetric(vertical: 6),
        ),
        textTheme: const TextTheme(
          bodyMedium: TextStyle(color: Colors.white70),
          bodyLarge: TextStyle(color: Colors.white),
          labelLarge: TextStyle(color: Colors.white60),
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            backgroundColor: AppColors.primaryBlue,
            foregroundColor: Colors.white,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(10),
            ),
          ),
        ),
        iconTheme: const IconThemeData(color: Colors.white70),
      ),
      home: const PortfolioPage(),
    );
  }
}

class PortfolioPage extends StatefulWidget {
  const PortfolioPage({super.key});

  @override
  State<PortfolioPage> createState() => _PortfolioPageState();
}

class _PortfolioPageState extends State<PortfolioPage> {
  final PortfolioManagerLib client = PortfolioManagerLib();

  String? accountOwner;
  String? accountPhone;
  String? accountCountry;
  String? accountAddress;
  String? accountEmail;
  String? accountCreationDate;
  bool? accountIsPremium;
  bool? isReady;
  String displayCurrency = "USD";

  List<Map<String, dynamic>> assets = [];
  Map<String, double> _cashBalances = {};
  Map<String, Map<String, double>> _fxTo = {};

  static const List<String> _supportedCurrencies = ["USD", "EUR", "GBP", "JPY"];

  @override
  void initState() {
    super.initState();
    _loadAll();
  }

  Future<void> _loadAll() async {
    try {
      await client.init();

      if (!client.isReady) {
        setState(() => isReady = client.isReady);
        return;
      }
    } catch (e) {
      if (mounted) setState(() => isReady = false);
      return;
    }

    Account? account;
    try {
      account = await client.getAccount(1001);
    } catch (e) {
      debugPrint('Failed to load account: $e');
    }

    FxRates? fxRates;
    try {
      fxRates = await client.getFxRates();
    } catch (e) {
      debugPrint('Failed to load FX rates: $e');
    }

    if (!mounted) return;

    setState(() {
      isReady = true;
      accountOwner = account?.owner ?? "Unknown";
      accountPhone = account?.phone ?? "Unknown";
      accountCountry = account?.country ?? "Unknown";
      accountAddress = account?.address ?? "Unknown";
      accountEmail = account?.email ?? "Unknown";
      accountCreationDate = account?.creationDate ?? "Unknown";
      accountIsPremium = account?.premium ?? false;
      assets = account?.positions ?? [];
      _cashBalances = account != null
          ? Map<String, double>.from(account.cashBalances)
          : <String, double>{};
      if (fxRates != null) {
        _fxTo = fxRates.rates;
      }
    });
  }

  double convertCurrency(double amount, String from, String to) {
    if (from == to) return amount;

    final directRate = _fxTo[from]?[to];
    if (directRate != null) {
      return amount * directRate;
    }

    final inverseRate = _fxTo[to]?[from];
    if (inverseRate != null && inverseRate != 0) {
      return amount / inverseRate;
    }

    debugPrint(
      'No FX rate found for $from -> $to, returning unconverted amount',
    );
    return amount;
  }

  double get totalCashBalances {
    return _cashBalances.entries.fold(0.0, (sum, entry) {
      return sum + convertCurrency(entry.value, entry.key, displayCurrency);
    });
  }

  double get totalAssetsValue {
    return assets.fold(0.0, (sum, asset) {
      final valueInUsd =
          (asset["quantity"] as num).toDouble() *
          (asset["price"] as num).toDouble();

      return sum + convertCurrency(valueInUsd, "USD", displayCurrency);
    });
  }

  double get totalNetWorth => totalCashBalances + totalAssetsValue;

  double assetValueInCurrency(
    Map<String, dynamic> asset,
    String fromCurrency,
    String toCurrency,
  ) {
    final quantity = (asset["quantity"] as num).toDouble();
    final price = (asset["price"] as num).toDouble();

    final valueInFrom = quantity * price;
    return convertCurrency(valueInFrom, fromCurrency, toCurrency);
  }

  String _money(double value) => "${value.toStringAsFixed(2)} $displayCurrency";

  Future<void> addAssetDialog() async {
    final symbolController = TextEditingController();
    final quantityController = TextEditingController();
    final priceController = TextEditingController();
    String? errorText;

    try {
      await showDialog(
        context: context,
        builder: (context) {
          return StatefulBuilder(
            builder: (context, setDialogState) {
              return AlertDialog(
                title: const Text("Add Asset"),
                content: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    TextField(
                      controller: symbolController,
                      decoration: const InputDecoration(labelText: "Symbol"),
                      textCapitalization: TextCapitalization.characters,
                    ),
                    TextField(
                      controller: quantityController,
                      keyboardType: const TextInputType.numberWithOptions(
                        decimal: true,
                      ),
                      decoration: const InputDecoration(labelText: "Quantity"),
                    ),
                    TextField(
                      controller: priceController,
                      keyboardType: const TextInputType.numberWithOptions(
                        decimal: true,
                      ),
                      decoration: const InputDecoration(
                        labelText: "Price (USD)",
                      ),
                    ),
                    if (errorText != null) ...[
                      const SizedBox(height: 8),
                      Text(
                        errorText!,
                        style: const TextStyle(color: Colors.redAccent),
                      ),
                    ],
                  ],
                ),
                actions: [
                  TextButton(
                    onPressed: () => Navigator.pop(context),
                    child: const Text("Cancel"),
                  ),
                  ElevatedButton(
                    onPressed: () {
                      final symbol = symbolController.text.trim().toUpperCase();
                      final quantity = double.tryParse(
                        quantityController.text.trim(),
                      );
                      final price = double.tryParse(
                        priceController.text.trim(),
                      );

                      if (symbol.isEmpty) {
                        setDialogState(() {
                          errorText = "Symbol is required.";
                        });
                        return;
                      }

                      if (quantity == null || quantity <= 0) {
                        setDialogState(() {
                          errorText = "Quantity must be a positive number.";
                        });
                        return;
                      }

                      if (price == null || price <= 0) {
                        setDialogState(() {
                          errorText = "Price must be a positive number.";
                        });
                        return;
                      }

                      setState(() {
                        assets = [
                          ...assets,
                          {
                            "symbol": symbol,
                            "quantity": quantity,
                            "price": price,
                          },
                        ];
                      });

                      Navigator.pop(context);
                    },
                    child: const Text("Add"),
                  ),
                ],
              );
            },
          );
        },
      );
    } finally {
      symbolController.dispose();
      quantityController.dispose();
      priceController.dispose();
    }
  }

  void _showCurrencyPicker() {
    showModalBottomSheet(
      context: context,
      builder: (context) {
        return SafeArea(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: _supportedCurrencies.map((currency) {
              return ListTile(
                title: Text(currency),
                trailing: currency == displayCurrency
                    ? const Icon(Icons.check, color: Colors.lightBlueAccent)
                    : null,
                onTap: () {
                  setState(() {
                    displayCurrency = currency;
                  });
                  Navigator.pop(context);
                },
              );
            }).toList(),
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        actionsPadding: const EdgeInsets.symmetric(
          horizontal: AppConstants.kPadding,
        ),
        actions: isReady == true
            ? [
                TextButton.icon(
                  onPressed: _showCurrencyPicker,
                  icon: const Icon(Icons.currency_exchange, size: 18),
                  label: Text(displayCurrency),
                ),
                IconButton(
                  icon: const Icon(Icons.person),
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (_) => AccountPage(
                          accountOwner: accountOwner,
                          accountIsPremium: accountIsPremium,
                          accountCountry: accountCountry,
                          accountAddress: accountAddress,
                          accountEmail: accountEmail,
                          accountPhone: accountPhone,
                          accountCreationDate: accountCreationDate,
                          displayCurrency: displayCurrency,
                          onAddAsset: addAssetDialog,
                        ),
                      ),
                    );
                  },
                ),
              ]
            : [],
      ),
      body: Padding(
        padding: const EdgeInsets.all(AppConstants.kPadding),
        child: isReady == null
            ? const Center(child: CircularProgressIndicator())
            : isReady == false
            ? Center(
                child: Card(
                  color: Colors.red.shade900,
                  child: Padding(
                    padding: const EdgeInsets.all(20),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const Icon(
                          Icons.warning_amber_rounded,
                          color: Colors.orange,
                        ),
                        const SizedBox(width: 12),
                        const Flexible(
                          child: Text(
                            "API not healthy/ready\n(Restart application, and try again)",
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              )
            : SingleChildScrollView(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    SizedBox(
                      width: double.infinity,
                      child: Card(
                        child: Padding(
                          padding: const EdgeInsets.all(20),
                          child: Stack(
                            children: [
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    "Cash Balance",
                                    style: Theme.of(
                                      context,
                                    ).textTheme.labelLarge,
                                  ),
                                  Text(
                                    _money(totalCashBalances),
                                    style: TextStyle(
                                      fontSize: 22,
                                      color: Theme.of(
                                        context,
                                      ).colorScheme.secondary,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  const SizedBox(height: 16),
                                  Text(
                                    "Net Worth",
                                    style: Theme.of(
                                      context,
                                    ).textTheme.labelLarge,
                                  ),
                                  Text(
                                    _money(totalNetWorth),
                                    style: const TextStyle(
                                      fontSize: 28,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ],
                              ),
                              Positioned(
                                top: 0,
                                right: 0,
                                child: IconButton(
                                  tooltip: "Refresh account",
                                  icon: const Icon(Icons.refresh),
                                  onPressed: () async {
                                    await _loadAll();
                                  },
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),

                    const SizedBox(height: 20),

                    const Text(
                      "Cash Balances",
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                      ),
                    ),

                    Text(
                      "Total: ${_money(totalCashBalances)}",
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: Colors.blue,
                      ),
                    ),

                    const SizedBox(height: 8),

                    Card(
                      child: ListView.builder(
                        shrinkWrap: true,
                        physics: const NeverScrollableScrollPhysics(),
                        itemCount: _cashBalances.length,
                        itemBuilder: (context, index) {
                          final entry = _cashBalances.entries.elementAt(index);
                          final convertedValue = convertCurrency(
                            entry.value,
                            entry.key,
                            displayCurrency,
                          );

                          return ListTile(
                            leading: const Icon(Icons.account_balance_wallet),
                            title: Text(entry.key),
                            subtitle: entry.key != displayCurrency
                                ? Text(
                                    "${entry.value.toStringAsFixed(2)} ${entry.key}",
                                    style: const TextStyle(fontSize: 12),
                                  )
                                : null,
                            trailing: Text(
                              _money(convertedValue),
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                                color: Theme.of(context).colorScheme.secondary,
                              ),
                            ),
                          );
                        },
                      ),
                    ),

                    const SizedBox(height: 20),

                    const Text(
                      "Assets",
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                      ),
                    ),

                    Text(
                      "Total: ${_money(totalAssetsValue)}",
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: Colors.blue,
                      ),
                    ),

                    const SizedBox(height: 8),

                    Card(
                      child: ListView.builder(
                        shrinkWrap: true,
                        physics: const NeverScrollableScrollPhysics(),
                        itemCount: assets.length,
                        itemBuilder: (context, index) {
                          final asset = assets[index];

                          final valueInDisplayCurrency = assetValueInCurrency(
                            asset,
                            "USD",
                            displayCurrency,
                          );

                          return ListTile(
                            hoverColor: Colors.transparent,
                            splashColor: Colors.transparent,
                            focusColor: Colors.transparent,
                            selectedTileColor: Colors.transparent,
                            onTap: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (_) =>
                                      AssetDetailPage(symbol: asset["symbol"]),
                                ),
                              );
                            },
                            title: Text(asset["symbol"]),
                            subtitle: Text(
                              "${asset["quantity"]} shares @ \$${(asset["price"] as num).toStringAsFixed(2)}",
                            ),
                            trailing: Text(
                              _money(valueInDisplayCurrency),
                              style: const TextStyle(
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          );
                        },
                      ),
                    ),

                    const SizedBox(height: 20),
                  ],
                ),
              ),
      ),
    );
  }
}
