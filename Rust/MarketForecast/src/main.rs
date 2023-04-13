use std::error::Error;

fn main() {
    let client = "guest:guest";
    let base = "http://api.tradingeconomics.com";
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_market_forecast_category(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_market_forecast_symbol(base_url, client_key);

}

fn get_market_forecast_category(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/markets/forecasts");
    let params:String = String::from("/index");
    let url = format!("{}{}{}?c={}&f=json", base_url, path, params, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Market Forecasts by category----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_market_forecast_symbol(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/markets/forecasts/symbol");
    let params:String = String::from("/BULGARIAGOVB10Y:GOV,LITHUANIAGOVBON10Y:GOV,GBGB10YR:GOV");
    let url = format!("{}{}{}?c={}&f=json", base_url, path, params, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Market Forecasts by multiple symbols----------------------");
    println!("{:#?}", resp);
    Ok(())

}
