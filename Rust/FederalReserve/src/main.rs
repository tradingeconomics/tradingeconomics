use std::error::Error;

fn main() {
    let client = "guest:guest";
    let base = "http://api.tradingeconomics.com";
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_fred_States(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_fred_counties(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_fred_symbol(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_fred_url(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_fred_country(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_fred_state(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_fred_county(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_fred_pike(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_fred_country_page(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_fred_historical_symbol(base_url, client_key);
}

fn get_fred_States(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/fred/states");
    let url = format!("{}{}?c={}", base_url, path, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Get a list of all states----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_fred_counties(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/fred/counties");
    let params:String = String::from("/arkansas");
    let url = format!("{}{}{}?c={}", base_url, path, params, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Get a list of counties per state----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_fred_symbol(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/fred/snapshot/symbol");
    let params:String = String::from("/ALLMARGATTN");
    let url = format!("{}{}{}?c={}", base_url, path, params, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Get fred snapshot by symbol----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_fred_url(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/fred/snapshot/url");
    let params:String = String::from("?url=/united-states/income-inequality-in-aleutians-east-borough-ak-fed-data.html");
    let url = format!("{}{}{}&c={}", base_url, path, params, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Get fred data by url----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_fred_country(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/fred/snapshot/country");
    let params:String = String::from("/united%20states");
    let url = format!("{}{}{}?c={}", base_url, path, params, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Get fred data by country----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_fred_state(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/fred/snapshot/state");
    let params:String = String::from("/tennessee");
    let url = format!("{}{}{}?c={}", base_url, path, params, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Get fred data by country----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_fred_county(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/fred/snapshot/county");
    let params:String = String::from("/arkansas");
    let url = format!("{}{}{}?c={}", base_url, path, params, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Get fred data by county----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_fred_pike(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/fred/snapshot/county");
    let params:String = String::from("/Pike County, AR");
    let url = format!("{}{}{}?c={}", base_url, path, params, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Get fred data of Pike County----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_fred_country_page(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/fred/snapshot/country");
    let params:String = String::from("/united%20states");
    let page:String = String::from("/2");
    let url = format!("{}{}{}{}?c={}", base_url, path, params, page, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Get fred data by country and page number----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_fred_historical_symbol(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/fred/historical");
    let params:String = String::from("/RACEDISPARITY005007,2020RATIO002013");
    let url = format!("{}{}{}?c={}", base_url, path, params, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Get fred historical data by symbol----------------------");
    println!("{:#?}", resp);
    Ok(())

}