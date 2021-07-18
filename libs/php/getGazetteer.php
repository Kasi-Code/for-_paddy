<?php

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true); 

    // Get Location
	$url = "https://api.opencagedata.com/geocode/v1/json?q=".$_REQUEST['lat']."+".$_REQUEST['long']."&key=87c637778f19465f89895cad4bf83cfa";

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);
	$output["country"] = $decode["results"][0];	
	// echo $result;
	// print_r($decode["results"][0]["components"]["city"]);

	$city = $decode["results"][0]["components"]["city"];
	$country = $decode["results"][0]["components"]["country"];
	$lat1 = $decode["results"][0]["geometry"]["lat"];
	$lng1 = $decode["results"][0]["geometry"]["lng"];

	// Use City to get Weather
	$url = "https://api.openweathermap.org/data/2.5/weather?q=".$country."&appid=cb79b904798a1f67e15e9d71fb81bc11";

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);
	$output["weather"] = $decode;	

	// // Get Population
	// $url = "https://restcountries.eu/rest/v2/capital/".$city;

	// $ch = curl_init();
	// curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	// curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	// curl_setopt($ch, CURLOPT_URL,$url);

	// $result=curl_exec($ch);

	// curl_close($ch);

	// $decode = json_decode($result,true);
	// $lat = $decode[0]["latlng"][0];	
    // $lng = $decode[0]["latlng"][1];	
	// $output["population"] = $decode;	

	// // Get Wikipedia
	$url = "http://api.geonames.org/wikipediaSearchJSON?formatted=true&q=".$city."&maxRows=10&username=coder_k&style=full";

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);
	$output["wikipedia"] = $decode["geonames"][0];	

	// COVID

	$url = "https://api.covid19api.com/live/country/".$country;

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);
	$output["covid"] = $decode;

	// // Get Currency
	$url = "https://openexchangerates.org/api/latest.json?app_id=4b8acff9591e4f8d8864ef8ca25aea3b";

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);
	$output["currency"] = $decode;	

	// COUNTRY BORDER - READ JSON FILE

	$json = file_get_contents("countryBorders.geo.json");

	//Decode JSON
	$json_data = json_decode($json,true);

	//Print data
	$output["countryBorders"] = $json_data["features"];	
	// print_r($json_data);

	// // Near by Places
	$url = "http://api.geonames.org/findNearbyWikipediaJSON?formatted=true&lat=".$lat1."&lng=".$lng1."&username=coder_k&style=full";

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);
	$output["poi_nearByPlaces"] = $decode["geonames"];	

	// Time
	$url = "http://api.geonames.org/timezoneJSON?formatted=true&lat=".$lat1."&lng=".$lng1."&username=coder_k&style=full";

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);
	$output["countryTime"] = $decode["time"];	

	// News
	$url = "http://api.mediastack.com/v1/news?access_key=5e058f99ba0b202d6f48cdec9773be90";

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);
	$output["News"] = $decode;	

	// $url = "http://api.geonames.org/findNearbyPOIsOSMJSON?formatted=true&lat=".$lat1."&lng=".$lng1."&username=coder_k&style=full";

	// $ch = curl_init();
	// curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	// curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	// curl_setopt($ch, CURLOPT_URL,$url);

	// $result=curl_exec($ch);

	// curl_close($ch);

	// $decode = json_decode($result,true);
	// $output["poi"] = $decode["poi"];	

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

