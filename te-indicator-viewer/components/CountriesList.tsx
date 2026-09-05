import { CountriesListProps } from "@/types"

const CountriesList = ({selectedCountry, setSelectedCountry, countries, error}: CountriesListProps ) => {
  return (
    <div>
       <div className=" text-center mb-2">
        <label htmlFor="country-select" className="mr-4">Select Country:</label>
        <select
          id="country-select"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className=" px-3 bg-white py-2 border rounded "
        >
          {countries.map((country) => (
            <option key={country} value={country}>
              {country.charAt(0).toUpperCase() + country.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <h1 className="  text-center font-bold mb-6 text-3xl">
        {selectedCountry.charAt(0).toUpperCase() + selectedCountry.slice(1)} Economic Indicators
      </h1>
      {error && (
        <div className="bg-red-200  rounded p-4 text-red-900">{error}</div>
      )}
    </div>
  )
}

export default CountriesList
