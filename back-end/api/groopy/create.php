<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

include_once '../objects/groopy.php';
 
$database = new Database();
$db = $database->getConnection();
 
$grpy = new Groopy($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// make sure data is not empty
if(
    !empty($data->r_id) &&
    !empty($data->date) &&
    !empty($data->time_start) &&
    !empty($data->time_end) &&
    !empty($data->time_cutoff) &&
    !empty($data->max_pp) &&
    !empty($data->min_pp) &&
    !empty($data->offer)
){
    $grpy->r_id = $data->r_id;
    $grpy->date = $data->date;
    $grpy->time_start = $data->time_start;
    $grpy->time_end = $data->time_end;
    $grpy->time_cutoff = $data->time_cutoff;
    $grpy->max_pp = $data->max_pp;
    $grpy->min_pp = $data->min_pp;
    $grpy->offer = $data->offer;
 
    if($grpy->create()){
 
        http_response_code(201);
        echo json_encode(array("message" => "Groopy was created."));
    }
 
    // if unable to create the user, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
        echo json_encode(array("message" => "Unable to create user."));
    }
}
 
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
    echo json_encode(array("message" => "Unable to create user. Data is incomplete."));
}
?>