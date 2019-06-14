# R EXAMPLES

In this folder you can find examples on how to use the Trading Economics API to get and use data in R language. 

We recommend installing Rstudio when programming in R.

## World Map Indicators example

In this example we use the API to get the latest data on all countries for a single indicator and display it on a world map.  
Each country will display the corresponding colour of the indicator colour scale.

To use this example you first need to install the following packages:

  * **ggplot2**
  
  * **tidyverse**

  * **tradingeconomics**

  * **maps**

After you install the packages you need to run the entire code first.

When you reach the line:
  
    my.indicator <- readline(prompt="Enter indicator: ")

The console will ask you to insert the indicator you want to use to create the map.

You can use the following link to check the indicator list:

 [Trading Economics Indicator list](https://api.tradingeconomics.com/indicators)

Finally, you just have to run the final line of code.
