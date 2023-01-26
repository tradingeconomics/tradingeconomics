use std::error::Error;

fn main() {
    let client = "guest:guest";
    let base = "http://api.tradingeconomics.com";
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_ratings(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_ratings_country(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_ratings_historical_country(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_latest_updates(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_latest_updates_by_date(base_url, client_key);

}

fn get_ratings(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/ratings");
    let url = format!("{}{}?c={}&f=json", base_url, path, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------List of credit ratings for all countries----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_ratings_country(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/ratings");
    let params:String = String::from("/mexico");
    let url = format!("{}{}{}?c={}&f=json", base_url, path, params, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------List of credit ratings by country or countries----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_ratings_historical_country(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/ratings/historical");
    let params:String = String::from("/mexico,sweden");
    let url = format!("{}{}{}?c={}&f=json", base_url, path, params, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------List of historical credit ratings for multiple countries----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_latest_updates(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/updates");
    let url = format!("{}{}?c={}&f=json", base_url, path, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Get the latest updates----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_latest_updates_by_date(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/updates");
    let date:String = String::from("/2018-01-01");
    let url = format!("{}{}{}?c={}&f=json", base_url, path, date, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("------------------------Get latest updates by a start date----------------------");
    println!("{:#?}", resp);
    Ok(())

}