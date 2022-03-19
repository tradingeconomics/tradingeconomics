import dash
import dash_bootstrap_components as dbc
from dash import Dash, Input, Output, callback, dcc, html

import tradingeconomics as te

app = Dash(
    __name__,
    title="Country vs GDP",
    suppress_callback_exceptions=True,
    external_stylesheets=[dbc.themes.BOOTSTRAP],
    serve_locally=False,
)

table_header = [html.Thead(html.Tr([html.Th("First Name"), html.Th("Last Name")]))]


def get_table_body():
    row1 = html.Tr([html.Td("Arthur"), html.Td("Dent")])
    row2 = html.Tr([html.Td("Ford"), html.Td("Prefect")])
    row3 = html.Tr([html.Td("Zaphod"), html.Td("Beeblebrox")])
    row4 = html.Tr([html.Td("Trillian"), html.Td("Astra")])
    return [html.Tbody([row1, row2, row3, row4])]


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
                dbc.DropdownMenuItem("China"),
            ],
            id="country-selector",
            color="info",
        ),
        html.Div(
            [
                dbc.Table(
                    table_header + get_table_body(), bordered=True, id="gdp-data"
                ),
            ],
            id="gdp-table",
        ),
    ],
    id="master",
)


@app.callback(
    Output(component_id="gdp-table", component_property="children"),
    [
        Input(component_id="dropdown-button-1", component_property="n_clicks"),
        Input(component_id="dropdown-button-2", component_property="n_clicks"),
    ],
)
def update_output_div(n1, n2):
    app.logger.info("{} {}".format(n1, n2))
    return (dbc.Table(table_header + get_table_body(), bordered=True, id="gdp-data"),)


if __name__ == "__main__":
    app.run_server(debug=True, host="0.0.0.0")
