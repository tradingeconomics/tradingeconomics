import axios from "axios"

interface IndicatorData {
  Country: string
  Category: string
  DateTime: string
  Value: number
}

export async function getIndicatorsData(
  countries: string[],
  indicators: string[],
  dateFrom: string,
  dateTo: string,
  apiKey: string,
): Promise<IndicatorData[] | null> {
  try {
    const countriesParam = countries.join(",")
    const indicatorsParam = indicators.join(",")

    const url = `https://api.tradingeconomics.com/historical/country/${countriesParam}/indicator/${indicatorsParam}/${dateFrom}/${dateTo}?c=${apiKey}&format=json`
    const response = await axios.get(url)

    if (response.status === 200) {
      return response.data as IndicatorData[]
    } else {
      throw new Error("Failed to fetch indicators data")
    }
  } catch (error: any) {
    console.error(error)
    throw new Error(error.message || "An error occurred while fetching indicators data")
  }
}

interface NewsItem {
  Title: string
  Source: string
  URL: string
  DateTime: string
}

export async function getNewsData(
  country: string,
  dateFrom: string,
  dateTo: string,
  apiKey: string,
): Promise<NewsItem[] | null> {
  try {
    const url = `https://api.tradingeconomics.com/news/country/${country}?c=${apiKey}&format=json&d1=${dateFrom}&d2=${dateTo}&s=1`
    const response = await axios.get(url)

    if (response.status === 200) {
      return response.data as NewsItem[]
    } else {
      throw new Error("Failed to fetch the news data")
    }
  } catch (error: any) {
    console.error(error)
    throw new Error(error.message || "An error occurred while fetching news data")
  }
}

