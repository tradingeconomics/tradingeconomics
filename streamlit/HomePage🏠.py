import streamlit as st
import requests
import pandas as pd
import matplotlib.pyplot as plt
import sys
import os


sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import config

st.set_page_config(page_title="GDP Comparison", page_icon="📊", layout="wide")

API_KEY = config.key

# Available countries
COUNTRIES = {
    'Mexico': 'mexico',
    'Sweden': 'sweden',
    'Thailand': 'thailand',
    'New Zealand': 'new zealand'
}

def fetch_gdp_data(country_code):
    try:
        url = f'https://api.tradingeconomics.com/historical/country/{country_code}/indicator/gdp?c={API_KEY}'
        response = requests.get(url)
        data = response.json()
        
        df = pd.DataFrame(data)
        df['DateTime'] = pd.to_datetime(df['DateTime'], format='ISO8601', utc=True)
        df = df.sort_values(by='DateTime')
        df = df.drop(df.index[-1])
        
        return df
    except:
        return None

st.title('📊 GDP Comparison Tool')
st.markdown("Compare GDP trends between two countries")

col1, col2 = st.columns(2)
with col1:
    country1_name = st.selectbox('Select First Country:', list(COUNTRIES.keys()), index=0)
    
with col2:
    country2_name = st.selectbox('Select Second Country:', list(COUNTRIES.keys()), index=1)


country1_code = COUNTRIES[country1_name]
country2_code = COUNTRIES[country2_name]


if st.button('Generate Comparison', type='primary') or True:
    with st.spinner('Fetching GDP data...'):
        df1 = fetch_gdp_data(country1_code)
        df2 = fetch_gdp_data(country2_code)
    
    if df1 is not None and df2 is not None:
        fig, ax = plt.subplots(figsize=(20, 6))
        
        ax.plot(df1['DateTime'], df1['Value'], 
                marker='o', linestyle='-', label=f'{country1_name} GDP', 
                linewidth=2, markersize=4)
        
        ax.plot(df2['DateTime'], df2['Value'], 
                marker='s', linestyle='-', label=f'{country2_name} GDP', 
                linewidth=2, markersize=4)
        
        ax.set_title(f'{country1_name} vs {country2_name} GDP Over Time', fontsize=16)
        ax.set_xlabel('Date', fontsize=12)
        ax.set_ylabel('GDP Value (Millions USD)', fontsize=12)
        ax.legend(fontsize=12)
        ax.grid(True, alpha=0.7)
        
        plt.xticks(rotation=45)
        plt.tight_layout()
        
        st.pyplot(fig)
        
        st.markdown("---")
        col1, col2 = st.columns(2)
        
        with col1:
            latest_value1 = df1['Value'].iloc[-1]
            latest_date1 = df1['DateTime'].iloc[-1].strftime('%Y-%m-%d')
            st.metric(
                label=f"{country1_name} Latest GDP",
                value=f"${latest_value1:,.0f}M",
                help=f"Last updated: {latest_date1}"
            )
        
        with col2:
            latest_value2 = df2['Value'].iloc[-1]
            latest_date2 = df2['DateTime'].iloc[-1].strftime('%Y-%m-%d')
            st.metric(
                label=f"{country2_name} Latest GDP", 
                value=f"${latest_value2:,.0f}M",
                help=f"Last updated: {latest_date2}"
            )
            
    else:
        st.error("Oops!! Selected countries not available in free model.")
