FROM node:alpine
WORKDIR /tradingeconomics
COPY examples .
RUN npm install --save tradingeconomics


# Build
# docker build -t tradingeconomics/nodejs:latest  .

# Run
# docker run --rm -it --init --name te-nodejs -e apikey='guest:guest' tradingeconomics/nodejs:latest sh

# Inside the container
# ls
# node Calendar/events.js
# node Indicators/historical.js
# node Markets/marketForecast.js

# Push the image into DockerHub
# docker push tradingeconomics/nodejs:latest

 