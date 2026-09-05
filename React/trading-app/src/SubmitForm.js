import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import moment from "moment/moment";
import axios from "axios";
import {ThreeDots} from 'react-loader-spinner';


const API_KEY = process.env.REACT_APP_API_KEY;

function MyForm({ sentDataToParent }) {
  const [countryName, setCountryName] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [data, setData] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const allCountryNames = response.data.map(
          (country) => country.name.common
        );
        setCountries(allCountryNames.sort());
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  // Function to check if all input fields are filled
  useEffect(() => {
    if (countryName.trim() !== "" && startDate !== null && endDate !== null) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [countryName, startDate, endDate]);

  // Function to handle input changes for text input
  const handleInputChange = (event) => {
    setCountryName(event.target.value);
  };

  // Function to handle start date changes
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  // Function to handle end date changes
  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    setSubmitted(true);

    let newStartDate = moment(startDate).format("yyyy-MM-DD");
    let newEndDate = moment(endDate).format("yyyy-MM-DD");

    (async () => {
      try {
        const response = await axios.get(
          `https://api.tradingeconomics.com/earnings-revenues/country/${countryName}?d1=${newStartDate}&d2=${newEndDate}&c=${API_KEY}`
        );
        if (response.data.length === 0) {
          alert("No data exist for this input parameters");
          window.location.reload()
        } else {
          setData(response.data);
          sentDataToParent(response.data);
          console.log(response.data);
        }
      } catch {
        alert("No access to this country data using the free API");
        window.location.reload()
      }finally{
        setLoading(false)
        setSubmitted(false);
      }
    })();
  };

  const handleReset = () => {
    setCountryName("");
    setStartDate("");
    setEndDate("");
  };

  // Determine if the button should be disabled
  const isButtonActive = submitted || loading;

  return (
    <div className="form">
      <fieldset>
        <form action="#" method="get">
          <label htmlFor="country">Country *</label>
          <select id="country" value={countryName} onChange={handleInputChange}>
            <option value="" disabled>
              Select a country
            </option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
          <div className="dateForm">
            <div>
              <label htmlFor="from">Form*</label>
              <DatePicker
                selected={startDate}
                dateFormat="yyyy-MM-dd"
                placeholderText="Enter start date"
                onChange={handleStartDateChange}
                required
              />
            </div>

            <div>
              <label htmlFor="to">To*</label>
              <DatePicker
                selected={endDate}
                dateFormat="yyyy-MM-dd"
                placeholderText="Enter end date"
                onChange={handleEndDateChange}
                required
              />
            </div>
          </div>

          <div className="button-class">
            <button
              type="reset"
              value="reset"
              className="reset"
              onClick={() => handleReset()}
            >
              Reset
            </button>
            <button
              type="submit"
              value="Submit"
              disabled={isButtonActive}
              className={
                isButtonDisabled ? "disabled-button" : "enabled-button"
              }
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </button>
          </div>
         {submitted &&( 
          <div className="loader">
          {loading && ( 
            <ThreeDots
              height="20"
              width="60"
              radius="9"
              color="#00BFFF"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true} />
              )}
          </div>
        )} 
        </form>
      </fieldset>
    </div>
  );
}

export default MyForm;
