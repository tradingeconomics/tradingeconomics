import dash
import dash_bootstrap_components as dbc
import pandas as pd
import plotly.express as px
from dash import Dash, Input, Output, callback, dcc, html, no_update

import tradingeconomics as te

te.login()

app = Dash(
    __name__,
    title="Country vs GDP",
    suppress_callback_exceptions=True,
    external_stylesheets=[dbc.themes.BOOTSTRAP],
    serve_locally=False,
)

table_header = [html.Thead(html.Tr([html.Th("First Name"), html.Th("Last Name")]))]


def get_gdp_data(country="United States"):
    """TODO(aziot)"""
    if not country:
        return None
    df = te.getHistoricalData(country=country, indicator="gdp", output_type="df")
    df["DateTime"] = df["DateTime"].astype("datetime64")
    return df.sort_values(by=["DateTime"], ascending=[False])[["DateTime", "Value"]]


def get_rating_data(country="United States"):
    if not country:
        return None
    df = te.getHistoricalRatings(country=country, output_type="df")
    df["Date"] = df["Date"].astype("datetime64")
    return df.sort_values(by=["Date"], ascending=[False])


app.layout = html.Div(
    [
        html.H2("Country vs. GDP"),
        html.Br(),
        html.Hr(),
        html.Br(),
        dbc.DropdownMenu(
            label="Country",
            children=[
                dbc.DropdownMenuItem("United States", id="dropdown-button-1"),
                dbc.DropdownMenuItem("United Kingdom", id="dropdown-button-2"),
                dbc.DropdownMenuItem("China", id="dropdown-button-3"),
            ],
            id="country-selector",
            color="info",
        ),
        html.Div(
            [
                dbc.Table.from_dataframe(
                    get_gdp_data(),
                    striped=True,
                    bordered=True,
                    hover=True,
                )
            ],
            id="gdp-table",
        ),
        html.Div(
            [
                dbc.Table.from_dataframe(
                    get_rating_data(),
                    striped=True,
                    bordered=True,
                    hover=True,
                )
            ],
            id="rating-table",
        ),
        dcc.Graph(id="graph-with-slider"),
    ],
    id="master",
)


@app.callback(
    Output(component_id="gdp-table", component_property="children"),
    [
        Input(component_id="dropdown-button-1", component_property="n_clicks"),
        Input(component_id="dropdown-button-2", component_property="n_clicks"),
        Input(component_id="dropdown-button-3", component_property="n_clicks"),
    ],
)
def update_output_div(n1, n2, n3):
    app.logger.info("{} {} {}".format(n1, n2, n3))

    # use a dictionary to map ids back to the desired label
    # makes more sense when there are lots of possible labels
    id_lookup = {
        "dropdown-button-1": "United States",
        "dropdown-button-2": "United Kingdom",
        "dropdown-button-3": "China",
    }

    ctx = dash.callback_context

    if (n1 is None and n2 is None and n3 is None) or not ctx.triggered:
        # if neither button has been clicked, return "Not selected"
        return no_update

    # this gets the id of the button that triggered the callback
    button_id = ctx.triggered[0]["prop_id"].split(".")[0]
    country = id_lookup[button_id]

    df = get_gdp_data(country)
    return dbc.Table.from_dataframe(df, striped=True, bordered=True, hover=True)


@app.callback(
    Output(component_id="rating-table", component_property="children"),
    [
        Input(component_id="dropdown-button-1", component_property="n_clicks"),
        Input(component_id="dropdown-button-2", component_property="n_clicks"),
        Input(component_id="dropdown-button-3", component_property="n_clicks"),
    ],
)
def update_output_div(n1, n2, n3):
    app.logger.info("{} {} {}".format(n1, n2, n3))

    # use a dictionary to map ids back to the desired label
    # makes more sense when there are lots of possible labels
    id_lookup = {
        "dropdown-button-1": "United States",
        "dropdown-button-2": "United Kingdom",
        "dropdown-button-3": "China",
    }

    ctx = dash.callback_context

    if (n1 is None and n2 is None and n3 is None) or not ctx.triggered:
        # if neither button has been clicked, return "Not selected"
        return no_update

    # this gets the id of the button that triggered the callback
    button_id = ctx.triggered[0]["prop_id"].split(".")[0]
    country = id_lookup[button_id]

    df = get_rating_data(country)
    return dbc.Table.from_dataframe(df, striped=True, bordered=True, hover=True)


if __name__ == "__main__":
    app.run_server(debug=True, host="0.0.0.0")
