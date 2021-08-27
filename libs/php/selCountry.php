<?php 

    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $executionStartTime = microtime(true);

	$countrySelected = $_REQUEST['selCountry'];

	// Get json file

	$json = file_get_contents("../../vendors/js/countryBorders.geo.json");

	//Decode JSON
	$json_data = json_decode($json,true);

	$isoForBorder = $json_data["features"];	

	for ($i = 0; $i < count($isoForBorder); $i++) {

		if ($countrySelected == $isoForBorder[$i]["properties"]["iso_a3"]) {
			$border[] = $isoForBorder[$i];
		}

	}	

	//Print data
	$output["border"] = $border;

	// Get Population
	$url = "https://restcountries.eu/rest/v2/alpha/".$countrySelected;

	// echo $url;

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);
	$output["population"] = $decode["population"];	
	$output["capital"] = $decode["capital"];	
	$lat = $decode["latlng"][0];	
    $lng = $decode["latlng"][1];	
	$capitalCity = $decode["capital"];	
    
	$capitalCity = str_replace(' ', '%20', $capitalCity);

	// Get Wikipedia
	$url = "http://api.geonames.org/wikipediaSearchJSON?formatted=true&q=".$capitalCity."&maxRows=10&username=coder_k&style=full";

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
	$output["thumbnailImg"] = $wikipedia["thumbnailImg"];	
	$output["lat"] = $wikipedia["lat"];	
	$output["lng"] = $wikipedia["lng"];	
	$output["placesNearBy"] = $decode["geonames"];	
	$latPOI = $decode["geonames"][0]["lat"];	
    $lngPOI = $decode["geonames"][0]["lng"];

	// Use City to get Weather
	$url = "https://api.openweathermap.org/data/2.5/weather?q=".$capitalCity."&appid=cb79b904798a1f67e15e9d71fb81bc11";

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);
	// $output["weather"] = $decode;		

	$output["description"] = $decode["weather"][0]["description"];	
	$output["temp"] = $decode["main"]["temp"];	

    // Get Location
	$url = "https://api.opencagedata.com/geocode/v1/json?q=".$lat."+".$lng."&key=87c637778f19465f89895cad4bf83cfa";

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);

	$results = $decode["results"][0];	

	$country = $results["components"]["country"];
	$output["country"] = $country;	
	
	$flag = $results["annotations"]["flag"];
	$output["flag"] = $flag;	

	$iso_code = $results["annotations"]["currency"]["iso_code"];
	$output["iso_code"] = $iso_code;	

	$name = $results["annotations"]["currency"]["name"];
	$output["name"] = $name;	

	$symbol = $results["annotations"]["currency"]["symbol"];
	$output["symbol"] = $symbol;	

	// $lat = $results["geometry"]["lat"];
	// $output["lat"] = $lat;

	// $lng = $results["geometry"]["lng"];
	// $output["lng"] = $lng;

	// Get Currency
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
	$url = "http://api.geonames.org/timezoneJSON?formatted=true&lat=".$lat."&lng=".$lng."&username=coder_k&style=full";

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);
	$output["countryTime"] = $decode["time"];	

	// Near by Places
	$url = "http://api.geonames.org/findNearbyWikipediaJSON?formatted=true&lat=".$latPOI."&lng=".$lngPOI."&username=coder_k&style=full";

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);

	if(isset($decode['geonames'])){
		$output["poi_nearByPlaces"] = $decode["geonames"];
	} else {
		$output["poi_nearByPlaces"] = NULL;
	}

	// POI

	$url = "http://api.geonames.org/findNearbyPOIsOSMJSON?formatted=true&lat=".$lat."&lng=".$lng."&username=coder_k&style=full";

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);
	

	curl_close($ch);

	$decode = json_decode($result,true);

	if(isset($decode['poi'])){
		$output["poi"] = $decode["poi"];
	} else {
		$output["poi"] = NULL;
	}

	// COVID

	$url = "https://api.covid19api.com/live/country/".$_REQUEST['selCountry'];

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