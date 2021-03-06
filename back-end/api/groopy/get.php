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

$stmt = $groopy->get();
$num = $stmt->rowCount();
 
if($num > 0) {

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $groopy_arr = array(
        "id" =>  $row['id'],
        "name" => $row['name'],
        "location" => array(
            "address1" => $row['address1'],
            "address2" => $row['address2'],
            "city" => $row['city'],
            "country" => $row['country'],
        ),
        "cuisineType" => $row['cuisine'],
        "image" => $row['image'],
        "offer" => $row['offer'],
        "timeStart" => date_format(date_create($row['time_start']), 'H:ia'),
        "timeEnd" => date_format(date_create($row['time_end']), 'H:ia'),
        "timeCutoff" => date_format(date_create($row['time_cutoff']), 'H:ia'),
        "peopleTotal" => $row['max_pp'],
        "peopleMin" => $row['min_pp'],
        "peopleJoining" => $row['cur_pp'],
        "needHelp" => $row['cfh_count'] > 0 ? true : false
    );
 
    http_response_code(200);
    echo json_encode($groopy_arr);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "Groopy does not exist."));
}
?>