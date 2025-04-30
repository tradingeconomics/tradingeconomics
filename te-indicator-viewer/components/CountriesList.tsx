import { CountriesListProps } from "@/types"

const CountriesList = ({selectedCountry, setSelectedCountry, countries, error}: CountriesListProps ) => {
  return (
    <div>
       <div className="mb-6 text-center">
        <label htmlFor="country-select" className="mr-2 font-medium">Select Country:</label>
        <select
          id="country-select"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="border px-3 py-2 rounded bg-white"
        >
          {countries.map((country) => (
            <option key={country} value={country}>
              {country.charAt(0).toUpperCase() + country.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <h1 className="text-3xl font-bold mb-6 text-center">
        {selectedCountry.charAt(0).toUpperCase() + selectedCountry.slice(1)} Economic Indicators
      </h1>
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>
      )}
    </div>
  )
}

export default CountriesList
