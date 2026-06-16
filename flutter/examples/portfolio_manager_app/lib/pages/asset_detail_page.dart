import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:portfolio_manager_lib/portfolio_manager_lib.dart';

class AssetDetailPage extends StatefulWidget {
  final String symbol;
  final PortfolioManagerLib? client;

  const AssetDetailPage({super.key, required this.symbol, this.client});

  @override
  State<AssetDetailPage> createState() => _AssetDetailPageState();
}

class _AssetDetailPageState extends State<AssetDetailPage> {
  Map<String, dynamic>? _marketData;
  List<dynamic>? _historyData;
  bool _isLoading = false;

  static const List<FlSpot> _mockSpots = [
    FlSpot(0, 100),
    FlSpot(1, 102),
    FlSpot(2, 105),
    FlSpot(3, 103),
    FlSpot(4, 108),
    FlSpot(5, 112),
    FlSpot(6, 97),
    FlSpot(7, 115),
    FlSpot(8, 103),
    FlSpot(9, 116),
    FlSpot(10, 122),
    FlSpot(11, 125),
    FlSpot(12, 120),
    FlSpot(13, 128),
    FlSpot(14, 130),
  ];

  @override
  void initState() {
    super.initState();
    _fetchData();
  }

  Future<void> _fetchData() async {
    if (widget.client == null) return;

    setState(() => _isLoading = true);

    try {
      final results = await Future.wait([
        widget.client!.getAssetDetails(widget.symbol),
        widget.client!.getAssetHistory(widget.symbol),
      ]);

      if (!mounted) return;
      setState(() {
        _marketData = results[0] as Map<String, dynamic>?;
        final historyResult = results[1] as Map<String, dynamic>?;
        _historyData = historyResult?['history'] as List<dynamic>?;
        _isLoading = false;
      });
    } catch (e) {
      debugPrint('Failed to load asset data: $e');
      if (!mounted) return;
      setState(() => _isLoading = false);
    }
  }

  List<FlSpot> get _chartSpots {
    if (_historyData != null && _historyData!.isNotEmpty) {
      return _historyData!.asMap().entries.map((entry) {
        final bar = entry.value as Map<String, dynamic>;
        final close = (bar['Close'] as num).toDouble();
        return FlSpot(entry.key.toDouble(), close);
      }).toList();
    }
    return _mockSpots;
  }

  String _percentText(dynamic value) {
    if (value == null) return '';
    final v = (value as num).toDouble();
    final prefix = v >= 0 ? '+' : '';
    return '$prefix${v.toStringAsFixed(2)}%';
  }

  Color _percentColor(dynamic value) {
    if (value == null) return Colors.grey;
    return (value as num) >= 0 ? Colors.green : Colors.red;
  }

  String _formatMarketCap(dynamic value) {
    if (value == null) return 'N/A';
    final v = (value as num).toDouble();
    if (v >= 1e12) {
      return '\$${(v / 1e12).toStringAsFixed(2)}T';
    } else if (v >= 1e9) {
      return '\$${(v / 1e9).toStringAsFixed(2)}B';
    } else if (v >= 1e6) {
      return '\$${(v / 1e6).toStringAsFixed(2)}M';
    }
    return '\$${v.toStringAsFixed(2)}';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('${widget.symbol} Chart')),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      widget.symbol,
                      style: const TextStyle(
                        fontSize: 28,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    if (_marketData != null)
                      Text(
                        _percentText(_marketData!['YTDPercentualChange']),
                        style: TextStyle(
                          color: _percentColor(
                            _marketData!['YTDPercentualChange'],
                          ),
                          fontWeight: FontWeight.bold,
                          fontSize: 20,
                        ),
                      )
                    else
                      Text(
                        '+8.3%',
                        style: TextStyle(
                          color: Theme.of(context).colorScheme.secondary,
                          fontWeight: FontWeight.bold,
                          fontSize: 20,
                        ),
                      ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 24),
            Expanded(
              child: _isLoading
                  ? const Center(child: CircularProgressIndicator())
                  : LineChart(
                      LineChartData(
                        gridData: const FlGridData(show: true),
                        borderData: FlBorderData(show: true),
                        titlesData: const FlTitlesData(show: true),
                        lineBarsData: [
                          LineChartBarData(
                            spots: _chartSpots,
                            isCurved: true,
                            color: Colors.blue,
                            barWidth: 4,
                            dotData: const FlDotData(show: true),
                          ),
                        ],
                      ),
                    ),
            ),
            const SizedBox(height: 16),
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  children: [
                    ListTile(
                      title: const Text('Weekly Change'),
                      trailing: Text(
                        _percentText(_marketData?['WeeklyPercentualChange']),
                        style: TextStyle(
                          color: _percentColor(
                            _marketData?['WeeklyPercentualChange'],
                          ),
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                    ListTile(
                      title: const Text('Monthly Change'),
                      trailing: Text(
                        _percentText(_marketData?['MonthlyPercentualChange']),
                        style: TextStyle(
                          color: _percentColor(
                            _marketData?['MonthlyPercentualChange'],
                          ),
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                    ListTile(
                      title: const Text('Market Cap'),
                      trailing: Text(
                        _formatMarketCap(_marketData?['MarketCap']),
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
