import "./App.css";
import { React, useState } from "react";
import MyForm from "./SubmitForm";
import DisplayData from "./DisplayData";

function App() {
  const [returnedData, setReturnedData] = useState([]);

  //callback function to handle data received from the child component
  const handleReturnedData = (data) => {
    setReturnedData(data);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h3>Displaying Earnings Revenues for a Country in a Specific Period</h3>
      </header>
      <div className="App-content">
        <MyForm sentDataToParent={handleReturnedData} />
        <DisplayData data={returnedData} />
      </div>
    </div>
  );
}

export default App;
