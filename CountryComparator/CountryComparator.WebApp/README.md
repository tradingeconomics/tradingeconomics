# CountryComparator.WebApp

## How to Run the Project Locally

**Set up the user secrets**

```sh
cd CountryComparator.WebApp
dotnet user-secrets init
dotnet user-secrets set "TradingEconomics:ApiKey" "your_api_key_here"
```

Replace "your_api_key_here" with your actual TradingEconomics API key.

**Restore the dependencies:**
```sh
dotnet restore
```

**Run the project:**

```sh
cd CountryComparator.WebApp
dotnet run
```

## How to Run the Project Locally Using Docker

**Build the Docker image:**

```sh
  docker build -f CountryComparator.WebApp/Dockerfile -t country-comparator-webapp .
```

**Run the Docker container:**

```sh
    docker run -e TradingEconomics:ApiKey="your_api_key" -p 8080:8080 country-comparator-webapp

```

Replace your_api_key with your actual Trading Economics API key.
