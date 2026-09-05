import streamlit as st
import requests
import sys
import os


sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import config

st.title("📰 Latest News")

def get_news():
    api_key = config.key
    url = f'https://api.tradingeconomics.com/news?c={api_key}'
    response = requests.get(url)
    return response.json()

news_data = get_news()
st.write(f"Found {len(news_data)} articles")


countries = []
categories = []
for article in news_data:
    if article['country'] not in countries:
        countries.append(article['country'])
    if article['category'] not in categories:
        categories.append(article['category'])

countries.sort()
categories.sort()

countries.pop(0);
categories.pop(0);

countries.insert(0, "All")
categories.insert(0, "All")


col1, col2 = st.columns(2)
with col1:
    filter_country = st.selectbox("Select Country:", countries, index=0, key="country_select")
with col2:
    filter_category = st.selectbox("Select Category:", categories, index=0, key="category_select")

filtered_news = []
for article in news_data:
    country_match = (filter_country == "All" or article['country'] == filter_country)
    category_match = (filter_category == "All" or article['category'] == filter_category)
    
    if country_match and category_match:
        filtered_news.append(article)

st.write("---")
st.header("Recent Articles")
st.write(f"Showing {len(filtered_news)} articles")

for i, article in enumerate(filtered_news[:20]): 
    
    st.markdown(f"### 🔹 {i+1}. {article['title']}")
    
    col1, col2, col3 = st.columns(3)
    with col1:
        st.write(f"**🌍 Country:** {article['country']}")
    with col2:
        st.write(f"**📂 Category:** {article['category']}")
    with col3:
        st.write(f"**📅 Date:** {article['date'][:10]}") 
    
    st.write(article['description'])
    
    st.write("---")

st.write("That's all the latest news!")
