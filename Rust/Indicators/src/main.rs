use std::error::Error;

fn main() {
    let client = "guest:guest";
    let base = "http://api.tradingeconomics.com";
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_indicators(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_indicators_by_country(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_indicators_by_indicator(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_historical_country_indicator(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_historical_country_indicator_date(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_historical_country_indicator_between_dates(base_url, client_key);

    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_historical_multi_country_indicator(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_historical_by_ticker(base_url, client_key);
}

fn get_indicators(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/indicators");
    let url = format!("{}{}?c={}", base_url, path, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------List of all indicators----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_indicators_by_country(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/country");
    let params:String = String::from("/mexico"); //sweden,mexico does not work
    let url = format!("{}{}{}?c={}&f=json", base_url, path, params, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------List of indicators by country----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_indicators_by_indicator(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/country/all");
    let params:String = String::from("/gdp");
    let url = format!("{}{}{}?c={}", base_url, path, params, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------List of all countries with a specific indicator----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_historical_country_indicator(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/historical/country");
    let params1:String = String::from("/sweden");
    let params2:String = String::from("/indicator/gdp");
    let url = format!("{}{}{}{}?c={}&f=json", base_url, path, params1, params2, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Historical data by country and indicator----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_historical_country_indicator_date(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/historical/country");
    let params1:String = String::from("/sweden");
    let params2:String = String::from("/indicator/gdp");
    let date:String = String::from("/2013-01-01");
    let url = format!("{}{}{}{}{}?c={}", base_url, path, params1, params2, date, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Historical data by country indicator and start date----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_historical_country_indicator_between_dates(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/historical/country");
    let params1:String = String::from("/sweden");
    let params2:String = String::from("/indicator/gdp");
    let date:String = String::from("/2015-01-01/2015-12-31");
    let url = format!("{}{}{}{}{}?c={}", base_url, path, params1, params2, date, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Historical data by country and indicator, between dates----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_historical_multi_country_indicator(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/historical/country");
    let params1:String = String::from("/mexico,sweden");
    let params2:String = String::from("/indicator/gdp,population");
    let url = format!("{}{}{}{}?c={}", base_url, path, params1, params2, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Historical data with multiple countries and indicators----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_historical_by_ticker(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/historical/ticker");
    let params1:String = String::from("/USURTOT");
    let date:String = String::from("/2015-03-01");
    let url = format!("{}{}{}{}?c={}", base_url, path, params1, date, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Historical data by specific ticker----------------------");
    println!("{:#?}", resp);
    Ok(())

}