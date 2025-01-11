from flask import Flask, render_template, request, send_file
import pandas as pd
import os
import tradingeconomics as te
from dotenv import load_dotenv
import logging

# Configure logging
logging.basicConfig(level=logging.ERROR)

# Load environment variables from .env file
load_dotenv()

# Get API key from environment variables
API_KEY = os.getenv('API_KEY')

if not API_KEY:
    raise ValueError("API_KEY is missing. Please define it in a .env file.")

# Initialize Flask app
app = Flask(__name__)

# Login to TradingEconomics
te.login(API_KEY)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/forecast', methods=['GET'])
def forecast():
    # Get country and indicator from the form (with defaults)
    country = request.args.get('country', 'Mexico')
    indicator = request.args.get('indicator', 'unemployment rate')

    try:
        # Fetch forecast data from TradingEconomics
        mydata = te.getForecastData(country=[country], indicator=[indicator], output_type='df')
        
        # Remove rows with unexpected or non-forecast content
        # Filter out rows where 'Country' is NaN or doesn't match the selected country
        mydata = mydata[mydata['Country'] == country]

        if mydata.empty:
            return render_template('error.html', error=f"No forecast data available for {country} and {indicator}.")

        # Convert data to HTML table
        df = pd.DataFrame(mydata)
        data_html = df.to_html(index=False)
        
        # Save to CSV for download
        csv_path = 'forecasts.csv'
        df.to_csv(csv_path, index=False, header=True)

    except Exception as e:
        logging.error(f"Error fetching data: {e}")
        return render_template('error.html', error=f"Could not fetch forecast data. Please try again later. Detailed error: {e}")
    
    # Render the data in a template with a download link
    return render_template('forecast.html', data=data_html, csv_path=csv_path)

@app.route('/download')
def download():
    csv_path = request.args.get('csv_path', 'forecasts.csv')
    return send_file(csv_path, as_attachment=True)

if __name__ == "__main__":
    app.run()