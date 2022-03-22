import random

import dash
import dash_bootstrap_components as dbc
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from dash import Dash, Input, Output, callback, dcc, html, no_update
from plotly.subplots import make_subplots

import tradingeconomics as te

te.login()

app = Dash(
    __name__,
    title="Credit rating vs. GDP",
    suppress_callback_exceptions=True,
    external_stylesheets=[dbc.themes.BOOTSTRAP],
    serve_locally=False,
)


def get_gdp_data(country="United States"):
    """TODO(aziot)"""
    if not country:
        return None
    df = te.getHistoricalData(country=country, indicator="gdp", output_type="df")
    df["DateTime"] = df["DateTime"].astype("datetime64")
    df["Year"] = df["DateTime"].transform([lambda dt: dt.year])
    df = df.rename(columns={"Value": "GDP"})
    return df.sort_values(by=["Year"], ascending=[False])[["Year", "GDP"]]


def get_rating_data(country="United States"):
    """TODO(aziot)"""
    if not country:
        return None
    df = te.getHistoricalRatings(country=country, output_type="df")
    df["Date"] = df["Date"].astype("datetime64")
    df["Year"] = df["Date"].transform([lambda dt: dt.year])
    return df.sort_values(by=["Year"], ascending=[False])[
        ["Year", "Agency", "Rating", "Outlook"]
    ]


app.layout = html.Div(
    [
        html.H2("Study the effect of a country's credit rating to its GDP."),
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
        dcc.Graph(id="gdp-vs-rating-graph"),
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


@app.callback(
    Output(component_id="gdp-vs-rating-graph", component_property="figure"),
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

    ratings = get_rating_data(country)
    gdp = get_gdp_data(country)

    agencies = set(ratings["Agency"].tolist())
    html.Div(
        [
            dcc.Graph(
                figure=dict(
                    data=[
                        dict(
                            x=ratings[ratings["Agency"] == agency][["Year"]],
                            y=ratings[ratings["Agency"] == agency][["Rating"]],
                            name=agency,
                            marker=dict(
                                color="rgb({}, {}, {})".format(
                                    random.randint(0, 255),
                                    random.randint(0, 255),
                                    random.randint(0, 255),
                                )
                            ),
                        )
                        for agency in agencies
                    ],
                    layout=dict(
                        title="{} GDP vs Credit Rating".format(country),
                        showlegend=True,
                        legend=dict(x=0, y=1.0),
                        margin=dict(l=40, r=0, t=40, b=30),
                    ),
                ),
                style={"height": 300},
            )
        ]
    )
    fig = make_subplots(specs=[[{"secondary_y": True}]])

    # Add traces
    fig.add_trace(
        go.Scatter(x=gdp["Year"].tolist(), y=gdp["GDP"].tolist(), name="GDP"),
        secondary_y=False,
    )

    for agency in agencies:
        fig.add_trace(
            go.Scatter(
                x=(ratings[ratings["Agency"] == agency])["Year"].tolist(),
                y=(ratings[ratings["Agency"] == agency])["Rating"].tolist(),
                name="{} rating".format(agency),
            ),
            secondary_y=True,
        )

    # Add figure title
    fig.update_layout(title_text="GDP vs Credit Rating")

    # Set x-axis title
    fig.update_xaxes(title_text="Year")

    # Set y-axes titles
    fig.update_yaxes(title_text="<b>GDP</b>", secondary_y=False)
    fig.update_yaxes(title_text="<b>Rating</b>", secondary_y=True)

    return fig

    return px.scatter(
        ratings,
        x="Year",
        y="Rating",
        hover_name="Agency",
        size_max=55,
    )


if __name__ == "__main__":
    app.run_server(debug=True, host="0.0.0.0")
