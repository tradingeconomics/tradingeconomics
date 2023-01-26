use std::error::Error;

fn main() {
    let client = "guest:guest";
    let base = "http://api.tradingeconomics.com";
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_comtrade_categories(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
    get_comtrade_Countries(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
    get_comtrade_by_country(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
    get_comtrade_by_country_page(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
    get_comtrade_between_two_contries(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
    get_comtrade_Historical(base_url, client_key);
}

fn get_comtrade_categories(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/comtrade/categories");
    let url = format!("{}{}?c={}", base_url, path, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Get detailed information about comtrade main categories----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_comtrade_Countries(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/comtrade/countries");
    let url = format!("{}{}?c={}", base_url, path, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Get detailed information about comtrade countries----------------------");
    println!("{:#?}", resp);
    Ok(())

}


fn get_comtrade_by_country(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/comtrade/country");
    let params:String = String::from("/sweden");
    let url = format!("{}{}{}?c={}", base_url, path, params, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Get detailed information about comtrade per country----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_comtrade_by_country_page(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/comtrade/country");
    let params:String = String::from("/sweden");
    let page:String = String::from("/2");
    let url = format!("{}{}{}{}?c={}", base_url, path, params, page, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Get comtrade data by specific country and page----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_comtrade_between_two_contries(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/comtrade/country");
    let params1:String = String::from("/mexico");
    let params2:String = String::from("/sweden");
    let page:String = String::from("/2");
    let url = format!("{}{}{}{}{}?c={}", base_url, path, params1, params2, page, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Get comtrade data between countries and page number----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_comtrade_Historical(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/comtrade/historical/PRTESP24031");
    let url = format!("{}{}?c={}", base_url, path, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Get comtrade historical data by symbol----------------------");
    println!("{:#?}", resp);
    Ok(())

}