library(ggplot2)
library(tidyverse)
library(tradingeconomics)
library(maps)


#Get data from the Trading Economics API
get_te_data <- function(ind){
  login('Your_Key:Your_Secret')
  world_ind <- getIndicatorData(country = "all", indicator = ind, outType = 'df')
  world_ind$Country <- as.character(world_ind$Country)
  world_ind[world_ind == "United States"] <- "USA"
  world_ind[world_ind == "United Kingdom"] <- "UK"
  merge_dfs(world_ind)
}

#Merge TE dataframe with the world map dataframe
merge_dfs <- function(df) {
  map.world <- map_data('world')
  map_data('world') %>% group_by(region) %>% summarise()
  merged_df <- left_join(map.world, df, by = c('region' = 'Country'))
  create_map(merged_df)
}

#Create map plot with merged dataframe
create_map <- function(df) {
  indicator <- unlist(df['LatestValue'])
  p <- ggplot(data = df, aes(x = long, y = lat, group = group)) + geom_polygon(aes(fill = indicator)) + labs(title = "Trading Economics", subtitle = paste('World View by', my.indicator, sep=" "), caption = "Trading Economics 2019") + theme(panel.background = element_rect(fill = "#BFD5E3")) + scale_fill_gradientn(colours = terrain.colors(5))
  print(p)
}

#Asks for indicator in console
my.indicator <- readline(prompt="Enter indicator: ")
#Start main function
get_te_data(my.indicator)
