<?php 

    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $executionStartTime = microtime(true); 

	// Read JSON file
	$json = file_get_contents('countryBorders.geo.json');

	//Decode JSON
	$json_data = json_decode($json,true);

	//Print data
	$output["countryBorders"] = $json_data["features"];	
	// print_r($json_data);

    // $url = "https://api.openweathermap.org/data/2.5/weather?q=london&appid=cb79b904798a1f67e15e9d71fb81bc11";

	// $ch = curl_init();
	// curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	// curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	// curl_setopt($ch, CURLOPT_URL,$url);

	// $result=curl_exec($ch);

	// curl_close($ch);

	// $decode = json_decode($result,true);
	// $output["weather"] = $decode;	


    header('Content-Type: application/json; charset=UTF-8');
	// echo "Lat: ".$_REQUEST['lat']."long: ".$_REQUEST['long'];
	// echo $result;
	echo json_encode($output); 

?>