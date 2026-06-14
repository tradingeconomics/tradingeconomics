import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';

class AssetDetailPage extends StatelessWidget {
  final String symbol;

  const AssetDetailPage({super.key, required this.symbol});

  @override
  Widget build(BuildContext context) {
    final mockData = <FlSpot>[
      const FlSpot(0, 100),
      const FlSpot(1, 102),
      const FlSpot(2, 105),
      const FlSpot(3, 103),
      const FlSpot(4, 108),
      const FlSpot(5, 112),
      const FlSpot(6, 97),
      const FlSpot(7, 115),
      const FlSpot(8, 103),
      const FlSpot(9, 116),
      const FlSpot(10, 122),
      const FlSpot(11, 125),
      const FlSpot(12, 120),
      const FlSpot(13, 128),
      const FlSpot(14, 130),
    ];

    return Scaffold(
      appBar: AppBar(title: Text("$symbol Chart")),
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
                      symbol,
                      style: const TextStyle(
                        fontSize: 28,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    Text(
                      "+8.3%",
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
              child: LineChart(
                LineChartData(
                  gridData: const FlGridData(show: true),
                  borderData: FlBorderData(show: true),
                  titlesData: const FlTitlesData(show: true),
                  lineBarsData: [
                    LineChartBarData(
                      spots: mockData,
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

            const Card(
              child: Padding(
                padding: EdgeInsets.all(16),
                child: Column(
                  children: [
                    ListTile(
                      title: Text("52 Week High"),
                      trailing: Text("\$145.00"),
                    ),
                    ListTile(
                      title: Text("52 Week Low"),
                      trailing: Text("\$88.00"),
                    ),
                    ListTile(
                      title: Text("Market Cap"),
                      trailing: Text("\$1.2T"),
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
