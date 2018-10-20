<?php
// required headers
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

$user->email = isset($_GET['email']) ? $_GET['email'] : die();
$user->password = isset($_GET['password']) ? $_GET['password'] : die();
 
$auth_res = $user->authenticate();

switch ($auth_res) {
    case 1: // match
        http_response_code(200);
        echo json_encode(array("message" => "Authentication successful."));
        break;
    case 0: // wrong password
        http_response_code(401);
        echo json_encode(array("message" => "Authentication failed.", "error" => "Password mismatch."));
        break;
    case -1: // user doesn't exist
        http_response_code(404);
        echo json_encode(array("message" => "Authentication failed.", "error" => "User not found."));
        break;
}

?>