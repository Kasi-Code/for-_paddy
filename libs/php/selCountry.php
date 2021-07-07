<?php 

    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $executionStartTime = microtime(true); 

	// Use City to get Weather
	$url = "https://api.openweathermap.org/data/2.5/weather?q=".$_REQUEST['selCountry']."&appid=cb79b904798a1f67e15e9d71fb81bc11";

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);
	$output["weather"] = $decode;	

	// Get Population
	$url = "https://restcountries.eu/rest/v2/name/".$_REQUEST['selCountry'];

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);
	$output["population"] = $decode;	
	$lat = $decode[0]["latlng"][0];	
    $lng = $decode[0]["latlng"][1];	
	$capitalCity = $decode[0]["capital"];	

	// Get Wikipedia
	$url = "http://api.geonames.org/wikipediaSearchJSON?formatted=true&q=".$capitalCity."&maxRows=10&username=coder_k&style=full";

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);
	$output["wikipedia"] = $decode["geonames"][0];	
	$latPOI = $decode["geonames"][0]["lat"];	
    $lngPOI = $decode["geonames"][0]["lng"];	

    // Get Location
	$url = "https://api.opencagedata.com/geocode/v1/json?q=".$lat."+".$lng."&key=87c637778f19465f89895cad4bf83cfa";

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);
	$output["country"] = $decode["results"][0];	
	$country = $decode["results"][0]["components"]["country"];

	// Get Currency
	$url = "https://openexchangerates.org/api/latest.json?app_id=4b8acff9591e4f8d8864ef8ca25aea3b";

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);
	$output["currency"] = $decode;	

	// Near by Places
	$url = "http://api.geonames.org/findNearbyPOIsOSMJSON?formatted=true&lat=".$latPOI."&lng=".$lngPOI."&username=coder_k&style=full";

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);
	$output["poi_nearByPlaces"] = $decode["poi"];	

    $output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
	// $output['data'] = $decode['weatherObservations'];
    
    header('Content-Type: application/json; charset=UTF-8');
	// echo "Lat: ".$_REQUEST['lat']."long: ".$_REQUEST['long'];
	// echo $result;
	echo json_encode($output); 

?>