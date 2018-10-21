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
$grpy_id = isset($_GET['g_id']) ? $_GET['g_id'] : die();

$ret = $user->join($grpy_id);

if ($ret == 1) { 
    http_response_code(200);
    // echo json_encode();
} else if ($ret == 0) {
    http_response_code(401);
    echo json_encode(array("message" => "Groopy full."));
} else if ($ret == -1) {
    http_response_code(404);
    echo json_enchode(array("message" => "Groopy not found."));   
}
?>