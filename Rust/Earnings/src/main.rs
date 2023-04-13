use std::error::Error;

fn main() {
    let client = "guest:guest";
    let base = "http://api.tradingeconomics.com";
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_earnings(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_earnings_by_date(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_earnings_between_dates(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_earnings_by_country(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_earnings_by_type(base_url, client_key);
}

fn get_earnings(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/earnings");
    let url = format!("{}{}?c={}", base_url, path, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Default earnings calendar----------------------");
    println!("{:#?}", resp);
    Ok(())

}


fn get_earnings_by_date(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/earnings/symbol");
    let params:String = String::from("/aapl:us");
    let date:String = String::from("2017-01-01");
    let url = format!("{}{}{}?d1={}&c={}", base_url, path, params, date, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Filter earnings calendar by symbol and date----------------------");
    println!("{:#?}", resp);
    Ok(())

}


fn get_earnings_between_dates(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/earnings/symbol");
    let params:String = String::from("/aapl:us");
    let date:String = String::from( "?d1=2016-01-01&d2=2017-12-31");
    let url = format!("{}{}{}{}&c={}", base_url, path, params, date, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Get earnings by symbol within a date interval----------------------");
    println!("{:#?}", resp);
    Ok(())

}


fn get_earnings_by_country(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/earnings/country");
    let params:String = String::from("/mexico");
    let url = format!("{}{}{}?c={}", base_url, path, params, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Get earnings by country----------------------");
    println!("{:#?}", resp);
    Ok(())

}


fn get_earnings_by_type(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/earnings");
    let params:String = String::from("?type=earnings");
    let url = format!("{}{}{}&c={}", base_url, path, params, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Get earnings by type----------------------");
    println!("{:#?}", resp);
    Ok(())

}