FROM rocker/shiny
ARG te_api_key
RUN install2.r shiny shinydashboard ggplot2 plotly dplyr 
COPY ./app.R /srv/shiny-server/
# Preserve the environment assigned during shiny startup with the shiny user
RUN echo -n "API_KEY=${te_api_key}" >> /home/shiny/.Renviron
RUN chown shiny:shiny /home/shiny/.Renviron