import 'package:portfolio_manager_lib/portfolio_manager_lib.dart';

Future<void> main() async {
  final client = PortfolioManagerLib();
  await client.init();
  print('client: ${client.isReady}');
}
