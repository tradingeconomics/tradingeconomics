<?php
 
$urls = array(
    //To get a list of all credit ratings
    'https://api.tradingeconomics.com/ratings',
    //To get ratings by country or countries
    'https://api.tradingeconomics.com/ratings/mexico',
    //To get a historical ratings by country or countries
    'https://api.tradingeconomics.com/ratings/historical/mexico,sweden'
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