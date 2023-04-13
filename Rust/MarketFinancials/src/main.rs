use std::error::Error;

fn main() {
    let client = "guest:guest";
    let base = "http://api.tradingeconomics.com";
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_market_financials_list(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_market_financials_by_country(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_market_financials_by_countries(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_market_financials_by_symbol(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_market_historical_by_symbol(base_url, client_key);

}

fn get_market_financials_list(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/financials/companies");
    let url = format!("{}{}?c={}&f=json", base_url, path, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Financials companies list----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_market_financials_by_country(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/financials/companies");
    let params:String = String::from("?country=united%20states");
    let url = format!("{}{}{}&c={}&f=json", base_url, path, params, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Financials companies list filtered by country----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_market_financials_by_countries(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/financials/companies");  
    let params:String = String::from("?country=spain,germany}");
    let url = format!("{}{}{}&c={}&f=json", base_url, path, params, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Financials companies list filtered by more than one country----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_market_financials_by_symbol(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/financials/symbol");
    let params:String = String::from("/aapl:us");
    let url = format!("{}{}{}?c={}&f=json", base_url, path, params, client_key);
    println!("{}", url);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Financials data by stock symbol----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_market_historical_by_symbol(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/financials/historical");
    let params:String = String::from("/aapl:us:assets");
    let url = format!("{}{}{}?c={}&f=json", base_url, path, params, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Financials historical data by financial symbol----------------------");
    println!("{:#?}", resp);
    Ok(())

}