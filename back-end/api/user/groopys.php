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
 
$stmt = $user->getGroopys();
$num = $stmt->rowCount();

if ($num > 0) {
    
    $grpy_arr = array();
    $grpy_arr['records'] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

        array_push($grpy_arr['records'], $row['id']);
    }
 
    http_response_code(200);
    echo json_encode($grpy_arr);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "No groopys found for this user."));
}
?>