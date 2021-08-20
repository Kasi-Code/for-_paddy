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
	// $output["codeAndNAme"] = $json_data["features"]["properties"];	
	// print_r($json_data);
    
    header('Content-Type: application/json; charset=UTF-8');
	// echo "Lat: ".$_REQUEST['lat']."long: ".$_REQUEST['long'];
	// echo $result;
	echo json_encode($output); 

?>