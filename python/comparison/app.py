from flask import Flask, render_template, request, jsonify
import requests
import os

# Assuming your HTML files are in a 'templates' folder within your project
app = Flask(__name__, template_folder='templates') 


# Use your API key
api_key = '647d0ba30e634fb:89ha7dkl7h2iaz6'

def fetch_data(country, group):
    url = f'https://api.tradingeconomics.com/country/{country}?c={api_key}&group={group}'
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        return []

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        country = request.form.get('country')
        indicator = request.form.get('indicator')
        data = fetch_data(country, indicator)
        return render_template('result.html', country=country, indicator=indicator, data=data)
    return render_template('index.html')

@app.route('/data/<country>/<indicator>', methods=['GET'])
def data(country, indicator):
    data = fetch_data(country, indicator)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
