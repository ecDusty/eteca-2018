<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
include_once '../config/database.php';
include_once '../objects/user.php';
 
$database = new Database();
$db = $database->getConnection();
 
$user = new User($db);
$user->id = isset($_GET['id']) ? $_GET['id'] : die();
$code = isset($_GET['code']) ? $_GET['code'] : die();
 
$ret = $user->checkin($code);
// $num = $ret->rowCount();

if ($ret === TRUE) {
    http_response_code(200);
    echo json_encode(array("message" => "Check in successful."));
    
} else {
    http_response_code(404);
    echo json_encode(array("message" => "Check in failed."));
}
?>