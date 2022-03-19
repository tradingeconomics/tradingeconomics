import dash
import dash_bootstrap_components as dbc
from dash import Dash, Input, Output, callback, dcc, html

import tradingeconomics as te

app = dash.Dash(external_stylesheets=[dbc.themes.BOOTSTRAP])

table_header = [html.Thead(html.Tr([html.Th("First Name"), html.Th("Last Name")]))]

row1 = html.Tr([html.Td("Arthur"), html.Td("Dent")])
row2 = html.Tr([html.Td("Ford"), html.Td("Prefect")])
row3 = html.Tr([html.Td("Zaphod"), html.Td("Beeblebrox")])
row4 = html.Tr([html.Td("Trillian"), html.Td("Astra")])

table_body = [html.Tbody([row1, row2, row3, row4])]


app.layout = html.Div(
    [
        html.H2("Country vs. GDP"),
        html.Br(),
        html.Hr(),
        html.Br(),
        dbc.DropdownMenu(
            label="Country",
            children=[
                dbc.DropdownMenuItem("United States"),
                dbc.DropdownMenuItem("United Kingdom"),
                dbc.DropdownMenuItem("China"),
            ],
            id="country-selector",
        ),
        dbc.Table(table_header + table_body, bordered=True),
    ],
    id="master",
)

# @app.callback(
#    Output(component_id='my-output', component_property='children'),
#    Input(component_id='my-input', component_property='value')
# )
# def update_output_div(input_value):
#    return f'Output: {input_value}'


if __name__ == "__main__":
    app.run_server(debug=True, host="0.0.0.0")
