<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/restaurant.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare user object
$restaurant = new Restaurant($db);
 
// set ID property of record to read
$restaurant->id = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of user to be edited
$restaurant->get();
 
if($restaurant->name!=null){
    // create array
    $restaurant_arr = array(
        "id" =>  $restaurant->id,
        "name" => $restaurant->name,
        "address" => $restaurant->address,
        "cuisine" => $restaurant->cuisine
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
    echo json_encode($restaurant_arr);
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user user does not exist
    echo json_encode(array("message" => "Restaurant does not exist."));
}
?>