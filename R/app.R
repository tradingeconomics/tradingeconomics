library(shiny)
library(shinydashboard)
library(ggplot2)
library(tradingeconomics)
library(dplyr)
library(knitr)  # For table formatting
library(DT)
library(maps)   # For map plotting

# Step 1: Fetch GDP data for multiple countries
get_gdp_data <- function() {
  # Authenticate with Trading Economics API
  login('ef07850540114d9:dk0wbmljy6g5mf0')

  # Fetch GDP data for the specified countries
  gdp_data <- getIndicatorData(country = c('Mexico', 'Sweden', 'Thailand', 'New Zealand'), indicator = 'GDP', outType = 'df')

  # Check if data was successfully retrieved
  if (nrow(gdp_data) > 0) {
    return(gdp_data)
  } else {
    return(NULL)
  }
}

# Step 2: Add geolocation data for the countries
add_geolocation <- function(gdp_data) {
  # Define coordinates for each country
  geolocation_data <- data.frame(
    Country = c('Mexico', 'Sweden', 'Thailand', 'New Zealand'),
    Latitude = c(23.6345, 60.1282, 15.8700, -40.9006),
    Longitude = c(-102.5528, 18.6435, 100.9925, 174.8860)
  )

  # Merge GDP data with geolocation data
  merged_data <- gdp_data %>%
    select(Country, LatestValue, Title) %>%
    inner_join(geolocation_data, by = "Country")

  return(merged_data)
}

# Step 4: Display GDP data in a structured format and rank by latest GDP value
display_gdp_data <- function(gdp_data) {
  # Create a structured table and rank by Latest Value
  gdp_table <- gdp_data %>%
    select(Country, Name = Title, Last = LatestValue) %>%
    arrange(desc(Last)) %>%  # Sort by Latest Value in descending order
    mutate(Rank = row_number())  # Add a rank column

  # Print the formatted table
  print(kable(gdp_table, format = "pipe", digits = 2))
}

# Create map plot with merged dataframe and country markers
create_map <- function(merged_data) {
  # Base map of the world
  world_map <- map_data("world")

  # Create the plot
  ggplot() +
    geom_polygon(data = world_map, aes(x = long, y = lat, group = group), fill = "lightgray") +
    geom_point(data = merged_data, aes(x = Longitude, y = Latitude, size = LatestValue, color = LatestValue), alpha = 0.7) +
    scale_color_gradient(low = "red", high = "green") +  # Color gradient from red (lowest) to green (highest)
    labs(title = "GDP of Selected Countries",
         x = "Longitude",
         y = "Latitude",
         color = "GDP (USD Billion)",
         size = "GDP (USD Billion)") +
    theme_minimal()
}

# Fetch the GDP data for the specified countries
gdp_data <- get_gdp_data()

# Merge with geolocation data
merged_data <- add_geolocation(gdp_data)

# Display the GDP data for all countries
display_gdp_data(merged_data)

# Define UI
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
      # Dashboard tab
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
                  title = "Ranked GDP Data",
                  status = "success",
                  solidHeader = TRUE,
                  dataTableOutput("gdp_table")
                )
              )
      ),

      # GDP Data tab
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

      # Geolocation Plot tab
      tabItem(tabName = "geo_plot",
              h2("Geolocated GDP Representation"),
              fluidRow(
                box(title = "GDP by Country",
                    status = "warning",
                    plotOutput("geo_plot"),  # Use plotOutput for ggplot2
                    width = 12)
              )
      )
    )
  )
)

# Define server
server <- function(input, output) {

  # Fetch GDP data
  gdp_data <- get_gdp_data()
  if (is.null(gdp_data)) {
    stop("No data retrieved. Please check the API key or the indicator.")
  }

  # Merge with geolocation data
  merged_data <- add_geolocation(gdp_data)

  # Render ranked GDP data table
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

  # Render geolocation plot
  output$geo_plot <- renderPlot({
    create_map(merged_data)
  })
}

# Run the Shiny app
shinyApp(ui = ui, server = server)
