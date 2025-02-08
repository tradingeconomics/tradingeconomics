from dotenv import load_dotenv
import tradingeconomics as te
import streamlit as st

from utils import (
    generate_comtrade_symbol,
    fetch_trade_data,
    process_trade_data,
    COUNTRY_NAME_TO_CODE,
    EXPORT_CODE,
    IMPORT_CODE,
)

import os

# Load environment variables
load_dotenv()
te_api_key = os.getenv("TE_API_KEY")
te.login(te_api_key)


def main() -> None:
    """
    Main function to run the Streamlit application, displaying the trading economics net export visualizer.
    """
    st.title("Trading Economics Net Export Visualizer")

    st.warning(
        """
        Please choose 2 countries. A graph be created to visualize:
          - the exports from Country 1 to Country 2
          - the imports of Country1 coming from Country2
          - the net exports from Country 1 to Country 2.
        """
    )

    col1, col2 = st.columns(2)
    country1 = col1.selectbox("Country 1", list(COUNTRY_NAME_TO_CODE.keys()))
    country2 = col2.selectbox("Country 2", list(COUNTRY_NAME_TO_CODE.keys()))

    # Ensure different countries are selected
    if country1 == country2:
        st.error("Please select two different countries.")
        return

    # Generate symbols for the selected countries
    import_symbol = generate_comtrade_symbol(country1, country2, IMPORT_CODE)
    export_symbol = generate_comtrade_symbol(country1, country2, EXPORT_CODE)

    st.divider()

    # Fetch and process data
    import_data, export_data = fetch_trade_data(import_symbol, export_symbol)
    trade_df = process_trade_data(import_data, export_data)

    # Display the chart
    st.line_chart(
        trade_df,
        x="year",
        y=["imports", "exports", "net_exports"],
        x_label="Year",
        y_label="Trade Volume (USD)",
    )


if __name__ == "__main__":
    main()
