use std::error::Error;

fn main() {
    let client = "guest:guest";
    let base = "http://api.tradingeconomics.com";
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_market_commodities(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_market_currency(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_market_crosses(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_market_indexes(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_bonds(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_market_symbol(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_market_peers(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_market_components(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_market_by_country_page(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_market_search(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_market_category(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_market_category_page(base_url, client_key);

}

fn get_market_commodities(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/markets/commodities");
    let url = format!("{}{}?c={}&f=json", base_url, path, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------List of commodities----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_market_currency(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/markets/currency");
    let url = format!("{}{}&c={}&f=json", base_url, path, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------List of the major currencies----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_market_crosses(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/markets/currency");
    let params:String = String::from("?cross=eur");
    let url = format!("{}{}{}&c={}&f=json", base_url, path, params, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Currency crosses----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_market_indexes(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/markets/index");
    let url = format!("{}{}?c={}&f=json", base_url, path, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Get stock market indexes----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_bonds(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/markets/bonds");
    let url = format!("{}{}&c={}&f=json", base_url, path, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Get government bonds----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_market_symbol(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/markets/symbol");
    let params:String = String::from("/aapl:us");
    let url = format!("{}{}{}?c={}&f=json", base_url, path, params, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("------------------------Get markets by symbol or symbols----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_market_peers(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/markets/peers");
    let params:String = String::from("/aapl:us");
    let url = format!("{}{}{}?c={}&f=json", base_url, path, params, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------A snapshot of latest peers prices by market----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_market_components(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/markets/components");
    let params:String = String::from("/psi20:ind");
    let url = format!("{}{}{}?c={}&f=json", base_url, path, params, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Get stock Market Index Components----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_market_by_country_page(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/markets/country");
    let params:String = String::from("/united%20states");
    let page:String = String::from("?page=2");
    let url = format!("{}{}{}{}&c={}&f=json", base_url, path, params, page, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Get stock Market by country and page number----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_market_search(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/markets/search");
    let params:String = String::from("/united%20states");
    let url = format!("{}{}{}?c={}&f=json", base_url, path, params, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Search for country----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_market_category(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/markets/search");
    let params:String = String::from("/united%20states");
    let category:String = String::from("?category=index,markets");
    let url = format!("{}{}{}{}&c={}&f=json", base_url, path, params, category, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Search for country and category----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_market_category_page(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/markets/search");
    let params:String = String::from("/united%20states");
    let category:String = String::from("?category=index,markets");
    let page:String = String::from("&page=2");
    let url = format!("{}{}{}{}{}&c={}&f=json", base_url, path, params, category, page, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("------------------------Search for country and category and page number----------------------");
    println!("{:#?}", resp);
    Ok(())

}