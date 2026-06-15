# Portfolio Manager Backend

This is an example of a Python back-end made with FastAPI framework in order to serve the app.

The purpose it's to return the account's data, fetchs data from Trading Economics API and cache wethever it cans. It uses the [tradingeconomics PyPI](https://github.com/tradingeconomics/tradingeconomics-python) package for fetching news, indicators and rates. Since this is a demonstration example, for now, the logic does not interact with any database nor persist data, but simply reads a mocked file at [app/storage.py](./app/storage.py).

## Requirements

* [Trading Economics API Key](https://tradingeconomics.com/api/pricing.aspx)

## Development

Initialize project (Only run once):

```shell
cd python/examples/portfolio_manager_backend
python -m venv .venv
. .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

Run backend:

> Before run command, pass your Trading Economics API key as `xxx`.

```shell
cd python/examples/portfolio_manager_backend
. .venv/bin/activate
PMEXAMPLE_TRADINGECONOMICS_API_KEY="xxx" python main.py
```

URLs Available after run:

* Swagger UI: http://127.0.0.1:8000/docs
* API Base URL: http://127.0.0.1:8000/api/v1
* API OpenAPI JSON Schema: http://127.0.0.1:8000/openapi.json
