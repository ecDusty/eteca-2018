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

$stmt = $restaurant->list();
$num = $stmt->rowCount();

if ($num > 0) {

    $rest_arr = array();
    $rest_arr['records'] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $rest_item = array(
            "id" => $id,
            "name" => $name,
            "address1" => $address1,
            "address2" => $address2,
            "city" => $city,
            "country" => $country,
            "cuisine" => $cuisine,
            "image" => $image
        );

        array_push($rest_arr['records'], $rest_item);
    }
 
    http_response_code(200);
    echo json_encode($rest_arr);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "Restaurant does not exist."));
}
?>