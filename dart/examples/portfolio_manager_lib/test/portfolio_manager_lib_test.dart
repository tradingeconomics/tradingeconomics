import 'package:portfolio_manager_lib/portfolio_manager_lib.dart';
import 'package:test/test.dart';

void main() {
  group('A group of tests', () {
    late PortfolioManagerLib client;

    setUp(() async {
      client = PortfolioManagerLib();
      await client.init();
    });

    test('First Test', () {
      expect(client.isReady, isTrue);
    });
  });
}
