This is my challenge submission for the open Web Developer position on Trading Economics. In it, data is pulled from the Trading Economics API for the yearly GDP and population data for Mexico, and I plot a couple of charts to see how they change over time since 1960.

Before running the app, please go to the `.env.development` file in the root directory and change `<ADD_YOUR_TRADING_ECONOMICS_API_KEY_HERE>` to be your Trading Economics API key. I used the key I created for my tests but did not want to check it into the repository.

To run, go to the `/myapp` folder and run the following:

```javascript
npm install
npm run dev
```

My submission can then be viewed in the browser at `localhost:5173`.

The data is pulled fro the following endpoint:

```
https://api.tradingeconomics.com/historical/country/Mexico/indicator/gdp,population?c=<MY_API_KEY>
```

For local testing purposes, this data is also located in the `data.js` file.

My next steps for this project will be to:

1. Move the charts to separate components.
2. Build a separate node.js service to more efficiently serve the Trading Economics data to the app, and to help avoid CORS issues.
3. Add unit tests.
4. Improve the UX around the chart tool tips and chart readability.
5. Add the ability to select different countries to see the same GDP information.
