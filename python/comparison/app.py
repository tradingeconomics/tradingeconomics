from flask import Flask, render_template, request
import requests

app = Flask(__name__)

# API key
api_key = '647d0ba30e634fb:89ha7dkl7h2iaz6'

# Function to fetch GDP data
def fetch_gdp_data(country):
    url = f'https://api.tradingeconomics.com/country/{country}?c={api_key}&group=gdp'
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": f"Error fetching data: {response.status_code}, Message: {response.text}"}

# Route for the main page (index)
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        country1 = request.form.get('country1')
        country2 = request.form.get('country2')

        # Fetch and process data
        data1 = fetch_gdp_data(country1)
        data2 = fetch_gdp_data(country2)

        # Pass data to the result template
        return render_template('result.html', country1=country1, country2=country2, data1=data1, data2=data2)
    
    # Display the index template
    return render_template('index.html')

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)