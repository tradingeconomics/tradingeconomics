use std::error::Error;

fn main() {
    let client = "guest:guest";
    let base = "http://api.tradingeconomics.com";
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_countries_list(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_countries_list_and_categories(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_data_by_group(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_data_by_category(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_data_by_country(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_data_by_country_category(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_data_by_country_group(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_historical(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_historical_by_date(base_url, client_key);
    let client_key:String  = String::from(client);
    let base_url:String = String::from(base);
	get_historical_by_range(base_url, client_key);
}

fn get_countries_list(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/eurostat/countries");
    let url = format!("{}{}?c={}", base_url, path, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------List of countries available----------------------");
    println!("{:#?}", resp);
    Ok(())

}


fn get_countries_list_and_categories(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/eurostat/categories");
    let url = format!("{}{}?c={}", base_url, path, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------List of categories and category groups available----------------------");
    println!("{:#?}", resp);
    Ok(())

}


fn get_data_by_group(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/eurostat");
    let params:String = String::from("?category_goup=Poverty");
    let url = format!("{}{}{}&c={}", base_url, path, params, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Get Eurostat data by Category Group----------------------");
    println!("{:#?}", resp);
    Ok(())

}


fn get_data_by_category(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/eurostat");
    let params:String = String::from("?category=People%20at%20risk%20of%20income%20poverty%20after%20social%20transfers");
    let url = format!("{}{}{}&c={}", base_url, path, params, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Get Eurostat data by Category----------------------");
    println!("{:#?}", resp);
    Ok(())

}


fn get_data_by_country(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/eurostat/country");
    let params:String = String::from("/Denmark");
    let url = format!("{}{}{}?c={}", base_url, path, params, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Get Eurostat data by Country----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_data_by_country_category(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/eurostat/country");
    let params:String = String::from("/Denmark");
    let category:String = String::from("?category=People%20at%20risk%20of%20income%20poverty%20after%20social%20transfers");
    let url = format!("{}{}{}{}&c={}", base_url, path, params, category, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Get Eurostat data by Country and category----------------------");
    println!("{:#?}", resp);
    Ok(())

}




fn get_data_by_country_group(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/eurostat/country");
    let params:String = String::from("/Denmark");
    let group:String = String::from("?category_goup=Poverty");
    let url = format!("{}{}{}{}&c={}", base_url, path, params, group, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Get Eurostat data by Country and category group----------------------");
    println!("{:#?}", resp);
    Ok(())

}


fn get_historical(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/eurostat/historical");
    let params:String = String::from("/24804");
    let url = format!("{}{}{}?c={}", base_url, path, params, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Get historical data by ID----------------------");
    println!("{:#?}", resp);
    Ok(())

}


fn get_historical_by_date(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/eurostat/historical");
    let params:String = String::from("/24804");
    let date:String = String::from("?d1=2015-01-01");
    let url = format!("{}{}{}{}&c={}", base_url, path, params, date, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Get historical data by ID and a start date----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn get_historical_by_range(base_url:String, client_key:String) -> Result<(), Box<dyn Error>> {
    let path:String = String::from("/eurostat/historical");
    let params:String = String::from("/24804");
    let date1:String = String::from("?d1=2016-01-01");
    let date2:String = String::from("&d2=2020-01-01");
    let url = format!("{}{}{}{}{}&c={}", base_url, path, params, date1, date2, client_key);
    let resp = reqwest::blocking::get(url)?.json::<serde_json::Value>()?;
    println!("-----------------------Get historical data by ID and a date range----------------------");
    println!("{:#?}", resp);
    Ok(())

}