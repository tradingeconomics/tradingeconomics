import os
import io
import json
import ast
import base64  
from flask import  Flask,jsonify,render_template,request
from my_trading_script import fetch_trading_data, fetch_commodity_data,fetch_symbol_serie,fetch_term_data

import pandas as pd
import matplotlib


import plotly.express as px
matplotlib.use("Qt5Agg") 
import matplotlib.pyplot as plt

matplotlib.use('agg')


app = Flask(__name__)

API_KEY = os.getenv("apikey")

# Fetch data
def get_data():
    
    data = fetch_trading_data()
    return data 
  
@app.route('/get_trading_data')
def get_trading_data():
    
    data = fetch_trading_data()
    return data


# Function to calculate GDP change

def calculate_gdp_change():
    data = get_data()
    for item in data:
        change = item["LatestValue"] - item["PreviousValue"]
        item["Change"] = change  # Add a new property for change
    return data
   

# Calculate GDP change for each country
data = calculate_gdp_change()  
@app.route('/')
def index():
     return render_template("index.html", data=data)
 # Function to filter data based on selected country
def filter_data(country):
  if country:
    return [item for item in data if item["Country"] == country]
  else:
    return data
 # Plotting the chart
@app.route('/plot', methods=['GET','POST'])

def create_chart():
    selected_country = request.args.get("country")

    filtered_data = filter_data(selected_country)
    #print(filtered_data)
    countries = [item["Country"] for item in filtered_data]
    gdp_data = [item["LatestValue"] for item in filtered_data]
    
    # Get the value of the selected element  form the  selected form
    data_str = request.form.getlist('country')
    data_list = data_str
    parsed_dict = ast.literal_eval(data_list[0])
    country_value = parsed_dict.get('Country')
    print(country_value)
    
    chart = None
    error_message = None

    # here i  used Plotly  to  generate the barchart
    # Generate chart as a byte stream (for image display)
    
    img_io = io.BytesIO()
   
    # Create a DataFrame
    df = pd.DataFrame({'Country': countries, 'GDP': gdp_data})

    # Create the bar chart
    fig = px.bar(df, x='Country', y='GDP', title='GDP by Country', labels={'GDP': 'GDP in billions'})
    
    # Set color attribute based on the selected country
    selected_country =country_value
    #Default color 
    default_color = 'rgba(31, 119, 180, 0.8)'
    # Convert the Plotly chart to HTML
    fig.data[0].marker.color = [default_color if c != selected_country else 'red' for c in df['Country']]
    plot_html = fig.to_html(full_html=False, include_plotlyjs='cdn')

    # Pass the HTML content to the template
    return render_template('plotting.html', plot=plot_html)
    
#Function to get the commodity
# Route
@app.route('/market',methods=['GET'])
def get_commod_data():
    dataset = fetch_commodity_data()
    return  render_template('infoTable.html',data=dataset)
## Here I used matplotlib.pyplot to draw the time serie chart
#Function to get the time serie
# Route
@app.route('/symbol',methods=['GET'])
def get_symbol():
    data_symbol = fetch_symbol_serie()
    # Convert the array of objects to a DataFrame
    df = pd.DataFrame(data_symbol)
    
    # Convert the 'date' column to datetime objects
    df['date'] = pd.to_datetime(df['date'])
    # Plot the time series
    plt.figure(figsize=(10, 6))
    plt.plot(df['date'], df['value'], marker='o', linestyle='-')
    plt.title('Time Series Plot')
    plt.xlabel('Date')
    plt.ylabel('Value')
    plt.grid(True)

    # Save the plot to a temporary buffer
    buffer = io.BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)
    plot_data = base64.b64encode(buffer.read()).decode('utf-8')
    
    #return datasymbol
    return render_template('detail.html',data=data_symbol,plot_data=plot_data)
    
# Question1

@app.route('/term',methods=['GET'])
def term():
    return render_template('term.html')

@app.route('/term', methods=['POST'])
def get_process_term():
   
    # Access the term data from the form submission
    submitted_term = request.form['term']
    
    data = fetch_term_data(submitted_term)
 
    return render_template('term.html', data_term=data)

if __name__ =='__main__':
   app.run(debug=True,port=8000)



