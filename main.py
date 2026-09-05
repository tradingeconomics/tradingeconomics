from flask import  Flask, render_template, request
import requests

app = Flask(__name__)

@app.route('/')
def index():
    # url of the API ypu want to fetch data from
    api_url = 'https://brains.tradingeconomics.com/v2/search/wb,fred,comtrade?q=nigeria&pp=50&p=0&_=1557934352427&stance=2'

    try:
        response = requests.get(api_url)
        response.raise_for_status() # Raise HTTPError for bad responses
        data = response.json()
        data = data['hits']
        print(data)
    except requests.exceptions.RequestException as e:
        data = {'error': str(e)}

    return render_template('index.html', data=data)

if __name__ == '__main__':
    app.run(debug=True)

