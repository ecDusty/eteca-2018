<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
include_once '../config/database.php';
include_once '../objects/groopy.php';

$database = new Database();
$db = $database->getConnection();

$groopy = new Groopy($db);

$groopy->id = isset($_GET['id']) ? $_GET['id'] : die();

$groopy->get();
 
if($groopy->name!=null) {

    $groopy_arr = array(
        "id" =>  $groopy->id,
        "name" => $groopy->name,
        "cuisineType" => $groopy->cuisine,
        "image" => $groopy->image,
        "offer" => $groopy->offer,
        "timeStart" => date_format(date_create($groopy->time_start), 'H:ia'),
        "timeEnd" => date_format(date_create($groopy->time_end), 'H:ia'),
        "peopleTotal" => $groopy->max_pp,
        "peopleMin" => $groopy->min_pp,
        "peopleJoining" => $groopy->cur_pp,
        "needHelp" => $groopy->has_cfh
    );
 
    http_response_code(200);
    echo json_encode($groopy_arr);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "Groopy does not exist."));
}
?>