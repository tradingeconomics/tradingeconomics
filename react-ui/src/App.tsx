import { Container, createTheme, Text } from "@nextui-org/react"
import { NextUIProvider } from "@nextui-org/react"
import Countries from './components/countries'
import Events from './components/events'
import React, {useState, useEffect, useCallback} from 'react';
import ProgressBar from "./components/progressbar";

const lightTheme = createTheme({
  type: 'light',
  theme: {
  }
})

const darkTheme = createTheme({
  type: 'dark',
  theme: {
  }
})

function App() {
  const [events, setEvents] = useState([]);
  const countries = [
    {
      country_name: 'Mexico',
      flag_country: 'mx',
      te_country: 'mexico'
    },
    {
      country_name: 'Thailand',
      flag_country: 'th',
      te_country: 'thailand'
    },
    {
      country_name: 'New Zealand',
      flag_country: 'nz',
      te_country: 'new%20zealand'
    },
    {
      country_name: 'Sweden',
      flag_country: 'se',
      te_country: 'sweden'
    }
  ];
  const [selectedCountry, setCountry] = useState(0);

  const setSelectedCountry = useCallback((idx) => {
    setCountry(idx);
  }, []);

  const fetchData = (location) => {
    return fetch(`https://api.tradingeconomics.com/calendar/country/${location}?c=c8d7dcb31e3d441:b6zcsgbva603wtg&f=json`)
          .then((response) => response.json())
          .then((data) => {
            setEvents(data);
      });
  }
  useEffect(() => {
    fetchData(countries[selectedCountry]['te_country']);
  }, [selectedCountry]);


  return (
    <NextUIProvider theme={lightTheme}>
      {!events.length && <ProgressBar></ProgressBar>}
      <Container>
        <Text h5>
          Choose Country
        </Text>
        <Countries country_list={countries} selectedCountry={selectedCountry} setSelectedCountry={setCountry} />
        <Text h3 style={{'textAlign':'center'}}>
          Events Calendar
        </Text>
        <Events events={events}/>
      </Container>
    </NextUIProvider>
  );
}

export default App;
