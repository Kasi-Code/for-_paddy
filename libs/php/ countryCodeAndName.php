<?php 

    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $executionStartTime = microtime(true); 

	// Read JSON file
	$json = file_get_contents('countryBorders.geo.json');

	// Decode JSON
	$json_data = json_decode($json,true);

	// Get individual data
	$nameAndISO = $json_data["features"];	

	for ($i = 0; $i < count($nameAndISO); $i++) {
		$name[] = $nameAndISO[$i]["properties"]["name"];
		$iso[] = $nameAndISO[$i]["properties"]["iso_a3"];
		// $geometry[] = $nameAndISO[$i]["geometry"];
	}

	// Print data for JS
	$output["name"] = $name;
	$output["iso"] = $iso;	
	// $output["geometry"] = $geometry;
    
    header('Content-Type: application/json; charset=UTF-8');
	// echo "Lat: ".$_REQUEST['lat']."long: ".$_REQUEST['long'];
	// echo $result;
	echo json_encode($output); 

?>