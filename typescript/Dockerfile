FROM node:lts
WORKDIR /tradingeconomics
COPY . .
RUN npm install --production

# Please change this to your keys
ENV key=guest
ENV secret=guest

CMD ["node", "app.js"]

# NOTES

# Build
# docker build -t tradingeconomics/typescript:latest  .

# Run
# docker run --rm -it --init --name te-typescript -e key=guest -e secret=guest tradingeconomics/typescript:latest

# Push
# docker push tradingeconomics/typescript:latest

 