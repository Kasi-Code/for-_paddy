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
	$results = $decode["results"][0];	
	
	$flag = $results["annotations"]["flag"];
	$output["flag"] = $flag;	

	$iso_code = $results["annotations"]["currency"]["iso_code"];
	$output["iso_code"] = $iso_code;	

	$name = $results["annotations"]["currency"]["name"];
	$output["name"] = $name;	

	$symbol = $results["annotations"]["currency"]["symbol"];
	$output["symbol"] = $symbol;	

	$lat = $results["geometry"]["lat"];
	$output["lat"] = $lat;

	$lng = $results["geometry"]["lng"];
	$output["lng"] = $lng;

	$country = $results["components"]["country"];
	$output["country"] = $country;
	$country = str_replace(' ', '%20', $country);

	$city = $results["components"]["city"];
	$output["city"] = $city;	
    $city;

    if(array_key_exists("city", $results["components"])){

        // "City  Found!

        $city = $decode["results"][0]["components"]["city"];

    }else{              

        // City not found, getting capital city from Rest Countries

        $url = "https://restcountries.com/v2/alpha".$decode["results"][0]["components"]["country_code"];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_URL,$url);
        $result=curl_exec($ch);
        curl_close($ch);

        $decode = json_decode($result,true);
        $city = $decode["capital"];
		
    }

	$city = str_replace(' ', '%20', $city);

	// // Near by Places
	$url = "http://api.geonames.org/findNearbyWikipediaJSON?formatted=true&lat=".$_REQUEST['lat']."&lng=".$_REQUEST['long']."&username=coder_k&style=full";

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);
	
	$output["poi_nearByPlaces"] = $decode["geonames"];	

	// Use City to get Weather
	$url = "https://api.openweathermap.org/data/2.5/weather?q=".$country."&appid=cb79b904798a1f67e15e9d71fb81bc11";

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);
	$lat1 = $decode["coord"]["lat"];
	$lng1 = $decode["coord"]["lon"];

	$output["description"] = $decode["weather"][0]["description"];	
	$output["temp"] = $decode["main"]["temp"];	
	$output["feels_like"] = $decode["main"]["feels_like"];	
	$output["humidity"] = $decode["main"]["humidity"];	

	// // Get Wikipedia
	$url = "http://api.geonames.org/wikipediaSearchJSON?formatted=true&q=".$city."&maxRows=10&username=coder_k&style=full";

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);
	$wikipedia = $decode["geonames"][0];	
	$output["wikipedia"] = $wikipedia["wikipediaUrl"];	
	$output["summary"] = $wikipedia["summary"];	
	// $output["placesNearBy"] = $decode["geonames"];	

	// COVID

	$url = "https://api.covid19api.com/live/country/".$country;

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);
	$covid = $decode[0];
	$output["Active"] = $covid["Active"];
	$output["Confirmed"] = $covid["Confirmed"];
	$output["Deaths"] = $covid["Deaths"];
	$output["Recovered"] = $covid["Recovered"];

	// // Get Currency
	$url = "https://openexchangerates.org/api/latest.json?app_id=4b8acff9591e4f8d8864ef8ca25aea3b";

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);

	$output["base"] = $decode["base"];	
	$output["rates"] = $decode["rates"];	

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
	$url = "https://newsapi.org/v2/everything?q=apple&from=". date("Y-m-d") . "&to=" . date("Y-m-d") ."&sortBy=popularity&apiKey=f6da9dbb1b344948aa2545a0fe23c83f";

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);
	$output["news"] = $decode;	

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

