"""
Mocked Storage
"""

accounts = {
    1001: {
        "account_id": 1001,
        "owner": "Alexandre Ferreira",
        "email": "hello@alexjorgef.com",
        "phone": "+351912345678",
        "currency": "USD",
        "account_type": "individual",
        "status": "active",
        "kyc_status": "verified",
        "risk_profile": "moderate",
        "country": "Portugal",
        "address": "Rua Augusta 120, Lisbon",
        "created_at": "2023-06-15T10:22:31Z",
        "last_login_at": "2026-06-12T18:44:12Z",
        "is_premium": True,
    },
    1002: {
        "account_id": 1002,
        "owner": "João Semedo",
        "email": "joaosemedo@example.com",
        "phone": "+351913456789",
        "currency": "EUR",
        "account_type": "individual",
        "status": "active",
        "kyc_status": "verified",
        "risk_profile": "conservative",
        "country": "Portugal",
        "address": "Avenida da Liberdade 88, Lisbon",
        "created_at": "2022-11-08T09:14:20Z",
        "last_login_at": "2026-06-11T07:21:44Z",
        "is_premium": False,
    },
    1003: {
        "account_id": 1003,
        "owner": "Amantha Jatson",
        "email": "amanjo@example.com",
        "phone": "+12025550123",
        "currency": "EUR",
        "account_type": "corporate",
        "status": "active",
        "kyc_status": "verified",
        "risk_profile": "aggressive",
        "country": "United States",
        "address": "350 Fifth Avenue, New York, NY",
        "created_at": "2021-04-27T15:33:52Z",
        "last_login_at": "2026-06-12T23:09:15Z",
        "is_premium": True,
    },
}

bank_accounts = {
    1001: {
        "iban": "PT50000201231234567890154",
        "swift": "TOTAPTPL",
        "bank_name": "Demo Bank",
    },
    1002: {
        "iban": "PT50000201239876543210987",
        "swift": "CGDIPTPL",
        "bank_name": "Demo Bank",
    },
    1003: {
        "iban": "US12345678901234567890",
        "swift": "BOFAUS3N",
        "bank_name": "Demo Bank",
    },
}

portfolio_cash_balances = {
    1001: {"EUR": 2512.12, "USD": 124.27},
    1002: {"EUR": 0.0, "USD": 15291.79},
    1003: {"EUR": 0.0, "USD": 15291.79},
}

portfolio_positions = {
    1001: [
        {"symbol": "AAPL", "quantity": 12.0},
        {"symbol": "TSLA", "quantity": 5.0},
        {"symbol": "BTC", "quantity": 0.4},
    ],
    1002: [
        {"symbol": "BTC", "quantity": 2.3},
        {"symbol": "GOOGL", "quantity": 2.0},
    ],
    1003: [
        {"symbol": "BTC", "quantity": 431.1},
        {"symbol": "GOOGL", "quantity": 2.0},
        {"symbol": "AAPL", "quantity": 12.0},
        {"symbol": "TSLA", "quantity": 5.0},
    ],
}
