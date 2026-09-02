import 'package:portfolio_manager_lib/portfolio_manager_lib.dart';
import 'package:test/test.dart';

void main() {
  group('PortfolioManagerLib', () {
    test('class is instantiable', () {
      final client = PortfolioManagerLib();
      expect(client, isA<PortfolioManagerLib>());
      expect(client.baseUrl, 'http://127.0.0.1:8000');
    });

    test('methods are present', () {
      final client = PortfolioManagerLib();
      expect(client.getFxRates, isNotNull);
      expect(client.getAccount, isNotNull);
      expect(client.getAssetDetails, isNotNull);
      expect(client.getAssetHistory, isNotNull);
      expect(client.init, isNotNull);
    });
  });
}
