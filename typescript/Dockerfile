FROM node:alpine
WORKDIR /tradingeconomics
COPY . .
RUN npm install --production

# Please change this to your API Credentials
ENV apikey='guest:guest'

CMD ["node", "app.js"]

# NOTES

# Build
# docker build -t tradingeconomics/typescript:latest  .

# Run
# docker run --rm -it --init --name te-typescript -e apikey='guest:guest' tradingeconomics/typescript:latest

# Push
# docker push tradingeconomics/typescript:latest

 