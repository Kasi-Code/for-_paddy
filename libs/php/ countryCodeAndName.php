<?php 

    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $executionStartTime = microtime(true); 

	$json = file_get_contents("countryBorders.geo.json");

	//Decode JSON
	$json_data = json_decode($json,true);

	//Print data
	$output["codeAndName"] = $json_data["features"];	

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