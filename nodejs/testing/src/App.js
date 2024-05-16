import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import SeriesChart from "./components/DataChart";
import "./css/bubble.css";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Alert, Button, Paper, Stack, Tooltip } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  ArrowForwardIosSharp,
  EditLocation,
  TrendingUp,
} from "@mui/icons-material";

import Backdrop from "@mui/material/Backdrop";

import useMediaQuery from "@mui/material/useMediaQuery";
import DataTable from "./components/Datatable";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const matches = useMediaQuery("(min-width:1020px)");
  const freeCountries = [
    { label: "Mexico", value: "Mexico" },
    { label: "New Zealand", value: "New Zealand" },
    { label: "Sweden", value: "Sweden" },
    { label: "Thailand", value: "Thailand" },
  ];
  const apiKey = process.env.REACT_APP_KEY;

  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState([]);
  const [indicator, setIndicator] = useState([]);
  const [indicators, setIndicators] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [sorry, setSorry] = useState(false);
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState({});
  useEffect(() => {
    setLoading(true);
    setData(freeCountries);
    fetch("https://api.tradingeconomics.com/indicators", {
      method: "GET",
      headers: { Authorization: apiKey },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        // console.log(result);
        let dataResult = [];
        const fake = [result[0], result[1], result[2]];
        for (let items in result) {
          let eachCountry = {};
          eachCountry.label = result[items].Category;
          eachCountry.value = result[items].Category;
          dataResult.push(eachCountry);
        }
        console.log("INDICATORS<", fake);
        setIndicators(dataResult);
        setLoading(false);
      });
  }, []);
  const getIndicators = async () => {
    // const value = country;
    if (country.length < 1 || indicator.length < 1) {
      setChartData([]);
      return;
    }
    setLoading(true);
    let allData = {};
    let countryx = "";
    console.log(allData);
    for (let singleCountry in country) {
      countryx += country[singleCountry].value + ",";
    }
    console.log(countryx);
    console.log(country, indicator);
    console.log(
      `https://api.tradingeconomics.com/historical/country/${countryx}/indicator/${indicator[0].value}`
    );
    fetch(
      `https://api.tradingeconomics.com/historical/country/${countryx}/indicator/${indicator[0].value}`,
      {
        method: "GET",
        headers: { Authorization: apiKey },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        for (let i = 0; i < result.length - 1; i++) {
          if (result[i].Country in allData) {
            allData[result[i].Country].push(result[i]);
          } else {
            allData[result[i].Country] = [];
            allData[result[i].Country].push(result[i]);
          }
        }
        console.log(result);
        const IDfy = result.map((old) => {
          return {
            ...old,
            id: old.Value,
          };
        });
        console.log(result);
        if (result.length < 2) {
          setSorry(true);
        }
        setRawData(IDfy);
        setChartData(allData);
        setLoading(false);
      });
  };
  return (
    <div className="App">
      {/* {String(loading)} */}
      <ThemeProvider theme={darkTheme}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 5,
          }}
        >
          <Paper
            elevation={5}
            style={{
              display: "flex",
              flexDirection: matches ? "row" : "column",
              justifyContent: "center",
              alignItems: "center",
              width: "80%",
              backgroundColor: "#333333",
              columnGap: 30,
              rowGap: matches ? 0 : 15,
              padding: 20,
              textAlign: "left",
              borderRadius: 20,
            }}
          >
            <EditLocation />
            <Autocomplete
              disablePortal
              // inputValue=""
              // onInputChange={(event, newInputValue) => {
              //   console.log(newInputValue);
              // }}
              onChange={(e, value) => setCountry(value)}
              multiple
              id="combo-box-demo"
              // getOptionDisabled={(options) => (country.length > 1 ? true : false)}
              options={data}
              // value={null}
              sx={{ minWidth: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Select Country or Countries" />
              )}
            />
            <TrendingUp />
            <Autocomplete
              disablePortal
              // inputValue=""
              // onInputChange={(event, newInputValue) => {
              //   console.log(newInputValue);
              getOptionDisabled={(options) =>
                indicator.length > 0 ? true : false
              }
              onChange={(e, value) => setIndicator(value)}
              // }}
              multiple
              id="combo-box-demo"
              options={indicators}
              // value={null}
              sx={{ minWidth: 300, maxWidth: "80vw" }}
              renderInput={(params) => (
                <TextField {...params} label="Select Indicator" />
              )}
            />

            <Button
              variant="contained"
              endIcon={<ArrowForwardIosSharp fontSize="inherit" />}
              color="secondary"
              onClick={() => getIndicators()}
            >
              See data
            </Button>
          </Paper>
        </div>
      </ThemeProvider>

      {loading ? (
        <>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
            // onClick={handleClose}
          >
            <div className="bubble" />
          </Backdrop>
        </>
      ) : (
        <>
          <div
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
              display: Object.keys(chartData).length > 0 ? "flex" : "none",
            }}
          >
            <Paper
              elevation={8}
              style={{
                backgroundColor: "white",
                width: matches ? "50%" : "80%",
                padding: 20,
                paddingBottom: 0,
              }}
            >
              <SeriesChart data={chartData} />
            </Paper>
          </div>
          <div
            style={{
              display: Object.keys(chartData).length > 0 ? "flex" : "none",
              marginBottom: 100,
              marginTop: 20,
            }}
          >
            <DataTable
              data={{
                columns: [
                  { Header: "Country", accessor: "Country", width: 200 },
                  { Header: "Value", accessor: "Value", width: 200 },
                  {
                    Header: "Year",
                    width: 200,
                    accessor: "DateTime",
                    renderCell: (params) => {
                      return `${new Date(params.row.DateTime).getFullYear()}`;
                    },
                  },

                  { Header: "Category", accessor: "Category", width: 200 },
                  {
                    Header: "Updated On",
                    width: 200,
                    accessor: "LastUpdate",
                    renderCell: (params) => {
                      return `${new Date(params.row.DateTime).getFullYear()}`;
                    },
                  },
                  // { Header: "Year", accessor: "DateTime" },
                ],
                rows: rawData,
              }}
            />
          </div>
          <div
            className="bubble"
            style={{
              display: Object.keys(chartData).length > 0 ? "none" : "flex",
              marginTop: matches ? 0 : 200,
            }}
          />
          {sorry && (
            <Stack
              style={{
                width: "100%",
                height: matches ? "75vh" : "10vh",
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                // position: "absolute",
              }}
            >
              <Alert severity="warning">Sorry :( No data was found</Alert>
            </Stack>
          )}
        </>
      )}
    </div>
  );
}

export default App;
