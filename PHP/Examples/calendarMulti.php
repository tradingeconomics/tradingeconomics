<?php
 
$urls = array(
    //To get a list of all calendar events
    'https://api.tradingeconomics.com/calendar',
    //Filter calendar events by date
    'https://api.tradingeconomics.com/calendar/country/All/2016-12-02/2016-12-03',
    //To get calendar events for a specific country and dates
    'https://api.tradingeconomics.com/calendar/country/united%20states/2016-02-01/2016-02-10',
    //To get calendar events for a specific indicator and dates
    'https://api.tradingeconomics.com/calendar/indicator/inflation%20rate/2016-03-01/2016-03-03',
    //To get calendar events for country indicator and dates
    'https://api.tradingeconomics.com/calendar/country/united%20states/indicator/initial%20jobless%20claims/2016-12-01/2017-02-25',
    //To get calendar events for specific id
    'https://api.tradingeconomics.com/calendar/calendarid/174108,160025,160030',
    //To get calendar events by ticker
    'https://api.tradingeconomics.com/calendar/ticker/IJCUSA,SPAINFACORD,BAHRAININFNRATE'
); 
$headers = array(
    "Accept: application/xml",
    "Authorization: Client guest:guest"
);
//An array that will contain all of the information
//relating to each request.
$requests = array();
  
//Initiate a multiple cURL handle
$mh = curl_multi_init();
 
//Loop through each URL.
foreach($urls as $k => $url){
    $requests[$k] = array();
    $requests[$k]['url'] = $url;
    //Create a normal cURL handle for this particular request.
    $requests[$k]['curl_handle'] = curl_init($url);
    //Configure the options for this request.
    curl_setopt($requests[$k]['curl_handle'], CURLOPT_HTTPHEADER, $headers);
    curl_setopt($requests[$k]['curl_handle'], CURLOPT_RETURNTRANSFER, true);
    
    //Add our normal / single cURL handle to the cURL multi handle.
    curl_multi_add_handle($mh, $requests[$k]['curl_handle']);
    
}

//Execute our requests using curl_multi_exec.
$stillRunning = true;
do {
    curl_multi_exec($mh, $stillRunning);
} while ($stillRunning);
 
//Loop through the requests that we executed.
foreach($requests as $k => $request){
    //Remove the handle from the multi handle.
    curl_multi_remove_handle($mh, $request['curl_handle']);
    //Get the response content and the HTTP status code.
    $requests[$k]['content'] = curl_multi_getcontent($request['curl_handle']);
    $requests[$k]['http_code'] = curl_getinfo($request['curl_handle'], CURLINFO_HTTP_CODE);
    //Close the handle.
    curl_close($requests[$k]['curl_handle']);
}
//Close the multi handle.
curl_multi_close($mh);
 
//var_dump the $requests array 
var_dump($requests);

?>