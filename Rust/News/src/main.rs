use std::error::Error;

fn main() {
    let client = "guest:guest";
    let base = "http://api.tradingeconomics.com";
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_news(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_news_by_country(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_news_by_indicator(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_news_by_country_indicator(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_news_by_page(base_url, client_key);

}

fn get_news(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/news");
    let url = format!("{}{}?c={}&f=json", base_url, path, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Get the latest news----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_news_by_country(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/news/country");
    let params:String = String::from("/mexico");
    let url = format!("{}{}{}?c={}&f=json", base_url, path, params, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Get news by country----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_news_by_indicator(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/news/indicator");
    let params:String = String::from("/inflation%20rate");
    let url = format!("{}{}{}?c={}&f=json", base_url, path, params, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Get news by indicator----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_news_by_country_indicator(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/news/country");
    let params1:String = String::from("/mexico");
    let params2:String = String::from("/inflation%20rate");
    let url = format!("{}{}{}{}?c={}&f=json", base_url, path, params1, params2, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Get news by country and indicator----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_news_by_page(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/news");
    let start:String = String::from("&start=10");
    let limit:String = String::from("?limit=15");
    let url = format!("{}{}{}{}&c={}&f=json", base_url, path, limit, start, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("------------------------Get news by start index and limit size list----------------------");
    println!("{:#?}", resp);
    Ok(())

}