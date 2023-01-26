use std::error::Error;

fn main() {
    let client = "guest:guest";
    let base = "http://api.tradingeconomics.com";
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_WB_categories(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_WB_by_category(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_WB_by_page(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_WB_indicator(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_WB_country_page(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_WB_by_url(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_WB_historical(base_url, client_key);

}

fn get_WB_categories(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/worldBank/categories");
    let url = format!("{}{}?c={}&f=json", base_url, path, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Get main categories----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_WB_by_category(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/worldBank/category");
    let params:String = String::from("/Education");
    let url = format!("{}{}{}?c={}&f=json", base_url, path, params, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Get world bank data by category----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_WB_by_page(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/worldBank/category");
    let params:String = String::from("/Education");
    let page:String = String::from("/2");
    let url = format!("{}{}{}{}?c={}&f=json", base_url, path, params, page, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Get world bank data by category and page number----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_WB_indicator(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/worldBank/indicator");
    let params:String = String::from("?s=fr.inr.rinr");
    let url = format!("{}{}{}&c={}&f=json", base_url, path, params, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Get world bank data by specific indicator----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_WB_country_page(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/worldBank/country");
    let params:String = String::from("/mexico");
    let page:String = String::from("/2");
    let url = format!("{}{}{}{}?c={}&f=json", base_url, path, params, page, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("------------------------Get world bank data by specific country and page----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_WB_by_url(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/worldBank/indicator");
    let params:String = String::from("?url=/united-states/real-interest-rate-percent-wb-data.html");
    let url = format!("{}{}{}&c={}&f=json", base_url, path, params, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Get world bank data by specific url----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_WB_historical(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/worldBank/historical");
    let params:String = String::from("?s=usa.fr.inr.rinr");
    let url = format!("{}{}{}&c={}&f=json", base_url, path, params, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("------------------------Get world bank historical data by specific series code----------------------");
    println!("{:#?}", resp);
    Ok(())

}