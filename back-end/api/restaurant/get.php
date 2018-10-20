<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
include_once '../config/database.php';
include_once '../objects/restaurant.php';

$database = new Database();
$db = $database->getConnection();

$restaurant = new Restaurant($db);

$restaurant->id = isset($_GET['id']) ? $_GET['id'] : die();

$restaurant->get();
 
if($restaurant->name!=null) {

    $restaurant_arr = array(
        "id" =>  $restaurant->id,
        "name" => $restaurant->name,
        "address" => $restaurant->address,
        "cuisine" => $restaurant->cuisine
    );
 
    http_response_code(200);
    echo json_encode($restaurant_arr);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "Restaurant does not exist."));
}
?>