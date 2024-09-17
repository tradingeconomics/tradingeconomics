FROM node:18-alpine
WORKDIR /tradingeconomics
COPY . .
RUN npm ci

ENV NODE_ENV=production

ENV VITE_APP_TE_API_KEY=81cf36f83faa423:9ixj6r8pkqe11mv

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "preview"]

# NOTES

# Build
# docker build -t tradingeconomics/typescript:latest  .

# Run
# docker run -p 8080:8080 --rm -it --init --name te-typescript -e VITE_APP_TE_API_KEY=81cf36f83faa423:9ixj6r8pkqe11mv tradingeconomics/typescript:latest

# Push
# docker push tradingeconomics/typescript:latest

 