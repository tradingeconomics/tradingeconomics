import requests
import pandas as pd
from datetime import datetime

def get_market_data():
    api_key = 'guest:guest'
    url = f'https://api.tradingeconomics.com/markets/symbol/aapl:us,gac:com?c={api_key}'
    return requests.get(url).json()

def format_change(value):
    return f"{value:>8.2f}%" if pd.notnull(value) else "N/A"

# Get data and create DataFrame
data = get_market_data()
df = pd.DataFrame(data)

# Select columns for comparison
columns = ['Symbol', 'Name', 'Last', 'DailyChange', 'WeeklyChange', 'MonthlyChange', 'YearlyChange']
df_display = df[columns]

# Print comparison header
print("\nMarket Comparison as of", datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
print("-" * 80)
print(df_display.to_string(index=False))

# Print detailed comparison
print("\nPerformance Comparison:")
print("-" * 80)

# Get data for each symbol
aapl_data = df[df['Symbol'] == 'AAPL:US'].iloc[0]
gac_data = df[df['Symbol'] == 'GAC:COM'].iloc[0]

# Calculate relative performance
print(f"\nRelative Performance (AAPL vs GAC):")
print(f"{'Metric':<15} {'AAPL':<12} {'GAC':<12} {'Difference':<12}")
print("-" * 50)
metrics = ['DailyChange', 'WeeklyChange', 'MonthlyChange', 'YearlyChange']
for metric in metrics:
    aapl_value = aapl_data[metric]
    gac_value = gac_data[metric]
    diff = aapl_value - gac_value
    metric_name = metric.replace('Change', '')
    print(f"{metric_name:<15} {format_change(aapl_value)} {format_change(gac_value)} {format_change(diff)}")

print("\nCurrent Prices:")
print(f"AAPL: ${aapl_data['Last']:.2f}")
print(f"GAC:  ${gac_data['Last']:.2f}")