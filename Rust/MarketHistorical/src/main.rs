use std::error::Error;

fn main() {
    let client = "guest:guest";
    let base = "http://api.tradingeconomics.com";
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_historical_symbol(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_historical_multi_symbol(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_historical_by_date(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_historical_between_dates(base_url, client_key);

}

fn get_historical_symbol(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/markets/historical");
    let params:String = String::from("/aapl:us");
    let url = format!("{}{}{}?c={}&f=json", base_url, path, params, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Historical markets by symbol----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_historical_multi_symbol(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/markets/historical");
    let params:String = String::from("/aapl:us,gac:com");
    let url = format!("{}{}{}?c={}&f=json", base_url, path, params, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Historical markets by multiple symbols----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_historical_by_date(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/markets/historical");
    let params:String = String::from("/aapl:us");
    let date:String = String::from("?d1=2017-08-01");
    let url = format!("{}{}{}{}&c={}&f=json", base_url, path, params, date, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Historical markets by start date----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_historical_between_dates(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/markets/historical");
    let params:String = String::from("/aapl:us");
    let date1:String = String::from("?d1=2017-08-01");
    let date2:String = String::from("&d2=2017-08-08");
    let url = format!("{}{}{}{}{}&c={}&f=json", base_url, path, params, date1, date2, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Historical markets between dates----------------------");
    println!("{:#?}", resp);
    Ok(())

}