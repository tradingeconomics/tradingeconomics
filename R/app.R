library(shiny)
library(shinydashboard)
library(plotly)
library(tradingeconomics)
library(dplyr)
library(knitr)
library(DT)
library(maps)
get_gdp_data <- function() {
  login('ef07850540114d9:dk0wbmljy6g5mf0')
  gdp_data <- getIndicatorData(country = c('Mexico', 'Sweden', 'Thailand', 'New Zealand'), indicator = 'GDP', outType = 'df')
  if (nrow(gdp_data) > 0) {
    return(gdp_data)
  } else {
    return(NULL)
  }
}

add_geolocation <- function(gdp_data) {
  # Define coordinates for each country
  geolocation_data <- data.frame(
    Country = c('Mexico', 'Sweden', 'Thailand', 'New Zealand'),
    Latitude = c(23.6345, 60.1282, 15.8700, -40.9006),
    Longitude = c(-102.5528, 18.6435, 100.9925, 174.8860)
  )

  merged_data <- gdp_data %>%
    select(Country, LatestValue, Title) %>%
    inner_join(geolocation_data, by = "Country")

  return(merged_data)
}
display_gdp_data <- function(gdp_data) {
  gdp_table <- gdp_data %>%
    select(Country, Name = Title, Last = LatestValue) %>%
    arrange(desc(Last)) %>%
    mutate(Rank = row_number())
  print(kable(gdp_table, format = "pipe", digits = 2))
}

create_map <- function(merged_data) {
  plot_geo(merged_data) %>%
    add_markers(
      x = ~Longitude,
      y = ~Latitude,
      size = ~LatestValue,
      color = ~LatestValue,
      hoverinfo = "text",
      text = ~paste("Country: ", Country, "<br>GDP: ", LatestValue, " USD Billion")
    ) %>%
    layout(
      title = 'GDP of Selected Countries',
      geo = list(
        scope = 'world',
        projection = list(type = 'orthographic'),
        showland = TRUE,
        landcolor = 'rgb(217, 217, 217)',
        subunitwidth = 1,
        countrywidth = 1,
        subunitcolor = 'rgb(255, 255, 255)',
        countrycolor = 'rgb(255, 255, 255)'
      )
    )
}
gdp_data <- get_gdp_data()
merged_data <- add_geolocation(gdp_data)
display_gdp_data(merged_data)

ui <- dashboardPage(
  dashboardHeader(title = "GDP Dashboard"),
  dashboardSidebar(
    sidebarMenu(
      menuItem("Dashboard", tabName = "dashboard", icon = icon("dashboard")),
      menuItem("GDP Data", tabName = "gdp_data", icon = icon("table")),
      menuItem("Geolocation Plot", tabName = "geo_plot", icon = icon("globe"))
    )
  ),
  dashboardBody(
    tabItems(
      tabItem(tabName = "dashboard",
              h2("Gross Domestic Product (GDP) Overview"),
              fluidRow(
                box(
                  title = "What is GDP?",
                  status = "info",
                  solidHeader = TRUE,
                  "Gross Domestic Product (GDP) is the total monetary value of all goods and services produced within a country's borders in a specific time period. It serves as a comprehensive measure of a nation's overall economic activity and provides insight into its economic health.",
                  br(),
                  "A higher GDP often indicates a more prosperous economy, suggesting greater wealth, better living standards, and higher levels of investment, including in government bonds."
                ),
                box(
                  title = "About The project",
                  status = "danger",
                  solidHeader =TRUE,
                  "This web application has been solely contributed by Elian Kim. The indicator used is in the category of GDP, from Trading Economics; This is a test demo.",

                )

              ),
              fluidRow(
                box(
                  title = "GDP Data",
                  status = "success",
                  solidHeader = TRUE,
                  width = '100%',
                  dataTableOutput("gdp_table")
                )
              )
      ),
      tabItem(tabName = "gdp_data",
              h2("GDP Data Overview"),
              fluidRow(
                box(title = "GDP Rankings",
                    status = "primary",
                    solidHeader = TRUE,
                    dataTableOutput("gdp_rank_table"),
                    width = 12)
              )
      ),
      tabItem(tabName = "geo_plot",
              h2("Geolocated GDP Representation"),
              fluidRow(
                box(title = "GDP by Country",
                    status = "warning",
                    plotlyOutput("geo_plot"),  # Use plotlyOutput for Plotly
                    width = 12)
              )
      )
    )
  )
)


server <- function(input, output) {


  gdp_data <- get_gdp_data()
  if (is.null(gdp_data)) {
    stop("No data retrieved. Please check the API key or the indicator.")
  }
  merged_data <- add_geolocation(gdp_data)

  output$gdp_rank_table <- renderDataTable({
    gdp_table <- gdp_data %>%
      select(Country, Name = Title, Last = LatestValue, Previous = PreviousValue, Unit, Date = LatestValueDate) %>%
      arrange(desc(Last)) %>%
      mutate(Rank = row_number())

    datatable(gdp_table, options = list(pageLength = 5))
  })

  # Render GDP data table
  output$gdp_table <- renderDataTable({
    datatable(gdp_data, options = list(pageLength = 5))
  })

  # Render geolocation plot with Plotly
  output$geo_plot <- renderPlotly({
    create_map(merged_data)
  })

}

# Run the Shiny app
shinyApp(ui = ui, server = server)
