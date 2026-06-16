import 'dart:convert';
import 'dart:io';

import 'models/account.dart';
import 'package:portfolio_manager_lib/src/models/rates.dart';

class PortfolioManagerLib {
  final String baseUrl;
  final String basePrefix;

  bool _isReady = false;
  bool get isReady => _isReady;

  PortfolioManagerLib({
    this.baseUrl = 'http://127.0.0.1:8000',
    this.basePrefix = '/api/v1',
  });

  Future<Map<String, dynamic>> _get(
    String path, [
    Map<String, String>? params,
  ]) async {
    final uri = Uri.parse(
      '$baseUrl$basePrefix$path',
    ).replace(queryParameters: params);

    final client = HttpClient();

    try {
      final request = await client.getUrl(uri);
      final response = await request.close();
      final body = await response.transform(utf8.decoder).join();

      if (response.statusCode != 200) {
        throw HttpException(
          'Request failed: ${response.statusCode} $body',
          uri: uri,
        );
      }

      return jsonDecode(body) as Map<String, dynamic>;
    } finally {
      client.close();
    }
  }

  Future<bool> _healthCheck() async {
    try {
      final data = await _get('/health') as Map<String, dynamic>;
      return data['status'] == 'ok' || data['status'] == 'ok-offline';
    } catch (_) {
      return false;
    }
  }

  Future<void> init() async {
    _isReady = await _healthCheck();
  }

  Future<FxRates> getFxRates() async {
    return FxRates.fromJson(await _get('/rates') as Map<String, dynamic>);
  }

  Future<Account> getAccount(int accountId) async {
    return Account.fromJson(
      await _get('/accounts/$accountId') as Map<String, dynamic>,
    );
  }
}
