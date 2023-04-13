use std::error::Error;

fn main() {
    let client = "guest:guest";
    let base = "http://api.tradingeconomics.com";
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_forecast_by_country(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_forecast_multi_country(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_forecast_indicator(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_forecast_multi_indicator(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_forecast_country_indicator(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_forecast_multi_country_indicator(base_url, client_key);
}

fn get_forecast_by_country(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/forecast/country");
    let params:String = String::from("/sweden");
    let url = format!("{}{}{}?c={}", base_url, path, params, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Forecasts by specific country----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_forecast_multi_country(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/forecast/country");
    let params:String = String::from("/mexico,sweden"); //sweden,mexico does not work
    let url = format!("{}{}{}?c={}&f=json", base_url, path, params, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Forecasts for multiple countries----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_forecast_indicator(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/forecast/indicator");
    let params:String = String::from("/gdp");
    let url = format!("{}{}{}?c={}", base_url, path, params, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Forecast by specific indicator----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_forecast_multi_indicator(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/forecast/indicator");
    let params:String = String::from("/gdp,population");
    let url = format!("{}{}{}?c={}&f=json", base_url, path, params, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Get fred data by url----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_forecast_country_indicator(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/historical/country");
    let params1:String = String::from("/sweden");
    let params2:String = String::from("/indicator/gdp");
    let url = format!("{}{}{}{}?c={}", base_url, path, params1, params2, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Forecasts by country and indicator----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_forecast_multi_country_indicator(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/historical/country");
    let param1:String = String::from("/mexico,sweden");
    let param2:String = String::from("/indicator/gdp,population");
    let url = format!("{}{}{}{}?c={}", base_url, path, param1, param2, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Forecasts for multiple countries and indicators----------------------");
    println!("{:#?}", resp);
    Ok(())

}