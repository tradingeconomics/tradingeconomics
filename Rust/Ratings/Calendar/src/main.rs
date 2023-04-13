use std::error::Error;

fn main() {

	MakeCalendarRequest();
	MakeCalendarCountryRequest();
	MakeCalendarIndicatorRequest();
	MakeCalendarCountryIndicatorRequest();
	MakeCalendarIdRequest();
}

fn MakeCalendarRequest() -> Result<(), Box<dyn Error>> {
    let resp = reqwest::blocking::get("https://api.tradingeconomics.com/calendar?c=guest:guest")?.json::<serde_json::Value>()?;
    println!("-----------------------CALENDAR EVENTS----------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn MakeCalendarCountryRequest() -> Result<(), Box<dyn Error>> {
    let resp = reqwest::blocking::get("https://api.tradingeconomics.com/calendar/country/united%20states?c=guest:guest")?.json::<serde_json::Value>()?;
    println!("-------------------CALENDAR BY COUNTRY => 'united states'------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn MakeCalendarIndicatorRequest() -> Result<(), Box<dyn Error>> {
    let resp = reqwest::blocking::get("https://api.tradingeconomics.com/calendar/indicator/inflation%20rate/2016-03-01/2016-03-03?c=guest:guest")?.json::<serde_json::Value>()?;
    println!("-------------------CALENDAR BY INDICATORS AND DATES =>'INFLATION RATE'------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn MakeCalendarCountryIndicatorRequest() -> Result<(), Box<dyn Error>> {
    let resp = reqwest::blocking::get("https://api.tradingeconomics.com/calendar/country/united%20states/indicator/initial%20jobless%20claims/2016-12-01/2017-02-25?c=guest:guest")?.json::<serde_json::Value>()?;
    println!("-------------------CALENDAR BY COUNTRY, INDICATOR AND DATES => 'united states, INITIAL JOBLESS CLAIMS'------------------");
    println!("{:#?}", resp);
    Ok(())

}

fn MakeCalendarIdRequest() -> Result<(), Box<dyn Error>> {
    let resp = reqwest::blocking::get("https://api.tradingeconomics.com/calendar/calendarid/174108,160025,160030?c=guest:guest")?.json::<serde_json::Value>()?;
    println!("-------------------CALENDAR BY ID=> '174108,160025,160030'------------------");
    println!("{:#?}", resp);
    Ok(())

}

