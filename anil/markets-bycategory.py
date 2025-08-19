import requests
import pandas as pd

api_key = 'guest:guest'
url = f'https://api.tradingeconomics.com/markets/currencies?c={api_key}'
#url = f'https://api.tradingeconomics.com/markets/symbol/aapl:us,gac:com?c=guest:guest'
data = requests.get(url).json()

# Convert the JSON data to a pandas DataFrame
df = pd.DataFrame(data)

# Print available columns
print("Available columns:", df.columns.tolist())

# Define desired columns
desired_columns = ['Symbol', 'Name', 'Last', 'Date', 'Group', 'Unit']

# Filter to only include columns that exist in the DataFrame
columns_to_display = [col for col in desired_columns if col in df.columns]

# Select existing columns
df_display = df[columns_to_display]

# Print using pandas built-in formatting
print("\nData:")
print(df_display.to_string(index=False))