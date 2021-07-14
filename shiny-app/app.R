library(shiny)
library(shinydashboard)
library(utils)
library(jsonlite)
library(ggplot2)
library(plotly)
library(dplyr)

api_key <- Sys.getenv('API_KEY')
root <- 'https://api.tradingeconomics.com/historical/country/'
country_list <- c("New Zealand", "Mexico", "Sweden", "Thailand")
indicator_list <- c("gdp", "population")

ui <- dashboardPage(
  dashboardHeader(title = "Indicator Dashboard"),
  dashboardSidebar(
    sidebarMenu(
      menuItem("Dashboard", tabName = "dashboard", icon = icon("dashboard")),
      menuItem("About", tabName = "about", icon = icon("th"))
    )
  ),
  dashboardBody(
    tabItems(
      tabItem(tabName = "dashboard",
              fluidRow(
                column(3, selectInput("country", "Country:", country_list)),
                column(3, selectInput("indicator", "Indicator:", indicator_list)),
                column(3, selectInput("startYear", "Start:", seq(1960,2021))),
                column(3, selectInput("endYear", "End:", seq(1960,2021), selected = 2020)) 
              ),
              fluidRow(plotlyOutput("countryIndicatorPlot"))
      ),
      tabItem(tabName = "about",
              h2("About"),
              p("This application allows you to view filtered time series data for selected indicators for selected countries.  
                It was built as a demo based on the requirements described at ",
                a('Trading Economics Developer/Data Scientist', href='https://tradingeconomics.com/careers.aspx'),
                '.  It uses APIs available in the ', 
                a('Trading Economics Documentation', href="http://docs.tradingeconomics.com/"),
                '.'
              ),
              p('The application was built using R and the Shiny web framework.  Packages used:',
                tags$ul(
                   tags$li('shiny'),
                   tags$li('shinydashboard'), 
                   tags$li('utils'), 
                   tags$li('ggplot2'), 
                   tags$li('jsonlite'),
                   tags$li('dplyr')),
              ),
              p('The shiny library is an R web application framework.  
                The shinydashboard library provides front-end styling.  
                The utils library was required for URL encoding.
                The ggplot2 library is used for plotting.
                The plotly library is used to convert the chart to HTML/JavaScript (rather than rendering an image).
                The jsonlite library is used for parsing JSON API responses.
                The dplyr library is used for filtering.')
      )
    )
  )
)

server <- function(input, output) {
  output$countryIndicatorPlot <- renderPlotly({
    
    url <- paste0(root,input$country,'/indicator/',input$indicator,'?c=', api_key )
    print(paste('URL:', url))
    df <- fromJSON(URLencode(url))
    df <- df %>% mutate(DateTime = as.Date(DateTime)) %>%
                  filter(DateTime >  paste0(input$startYear,'-01-01') & 
                        DateTime <= paste0(input$endYear,  '-12-31'))
    
    ggplot(df, aes(x=DateTime, y=Value)) + geom_line() + scale_x_date() + 
      ggtitle(paste(input$country, input$indicator))
  })
}

shinyApp(ui, server)