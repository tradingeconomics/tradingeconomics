# **Documentation: Comparing Manufacturing Wages (Sweden vs. Mexico)**

## **Overview**

This script retrieves and visualizes forecasted manufacturing wages in Sweden and Mexico, converting them into **USD** for comparison. It uses **Trading Economics API** for forecast data and **ExchangeRate-API** for currency conversion.

---

## **Dependencies**

The script requires the following libraries:

* `tradingeconomics` – For retrieving economic forecast data.
* `dotenv` – For securely loading API keys from an environment file.
* `os` – To access environment variables.
* `matplotlib.pyplot` – For data visualization.
* `requests` – To fetch exchange rate data.

To install required packages, run:

```bash
pip install tradingeconomics python-dotenv matplotlib requests
```

---

## **Setup**

1. Obtain API keys:
   * **Trading Economics API Key** : [Trading Economics](https://developer.tradingeconomics.com/)
   * **ExchangeRate-API Key** : [ExchangeRate-API](https://www.exchangerate-api.com/)
2. Store API keys in a `.env` file:

```
API_KEY=your_tradingeconomics_api_key
EX_API_KEY=your_exchangerate_api_key
```

3. Load environment variables in your script:

```python
from dotenv import load_dotenv
load_dotenv()
```

---

## **Functions and Workflow**

### **1. `getExchangeRate(symbol)`**

Retrieves the exchange rate of a given currency relative to  **USD** .

#### **Parameters:**

* `symbol`  *(str)* : The currency code (e.g., "MXN", "SEK").

#### **Returns:**

* `float`: Exchange rate from the specified currency to USD.

#### **Example Usage:**

```python
usd_to_sek = getExchangeRate("SEK")
print(f"1 SEK = {usd_to_sek} USD")
```

### **2. `getCategory(forcasts, key)`**

Extracts a specific category of forecasted economic data.

#### **Parameters:**

* `forcasts`  *(list)* : Economic forecast data retrieved from Trading Economics.
* `key`  *(str)* : The category to filter (e.g., "Wages in Manufacturing").

#### **Returns:**

* `dict`: The forecast data for the requested category.

#### **Example Usage:**

```python
wages_sweden = getCategory(forcasts_SWEDEN, "Wages in Manufacturing")
```

---

## **Main Execution Flow**

1. **Authenticate with Trading Economics API** :

```python
   te.login(os.environ["API_KEY"])
```

1. **Fetch forecast data for Sweden and Mexico** :

```python
   forcasts_MEXICO = te.getForecastData(country='mexico')
   forcasts_SWEDEN = te.getForecastData(country='sweden')
```

1. **Extract manufacturing wages data** :

```python
   wages_manfac_sweden = getCategory(forcasts_SWEDEN, "Wages in Manufacturing")
   wages_manfac_mexico = getCategory(forcasts_MEXICO, "Wages in Manufacturing")
```

1. **Retrieve exchange rates for the respective currencies** :

```python
   unit_mexico = wages_manfac_mexico["Unit"].split("/")[0]
   unit_sweden = wages_manfac_sweden["Unit"].split("/")[0]
   rate_mexico = getExchangeRate(unit_mexico)
   rate_sweden = getExchangeRate(unit_sweden)
```

1. **Convert wages into USD and prepare data for visualization** :

```python
   wages_sweden = [wages_manfac_sweden[f"q{i}"]/rate_sweden for i in range(1, 5)]
   wages_mexico = [wages_manfac_mexico[f"q{i}"]/rate_mexico for i in range(1, 5)]
```

1. **Plot the data using Matplotlib** :

```python
   plt.plot(dates, wages_sweden, marker='o', linestyle='-', color='magenta', label="Sweden")
   plt.plot(dates, wages_mexico, marker='s', linestyle='--', color='navy', label="Mexico")
```

---

## **Visualization Output**

The script generates a **line chart** comparing hourly wages in manufacturing (USD) for Sweden and Mexico over four quarters.

#### **X-axis:** Dates (quarters)

#### **Y-axis:** Wages in USD

#### **Legend:**

* **Magenta Line** → Sweden
* **Navy Dashed Line** → Mexico
