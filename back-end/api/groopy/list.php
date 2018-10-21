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

$r_id = isset($_GET['r_id']) ? $_GET['r_id'] : null;
$rest = false;

if ($r_id != null) {
    $rest = true;
    $groopy->r_id = $r_id;
    $stmt = $groopy->listByRestaurant();
} else {
    $stmt = $groopy->list();
}

$num = $stmt->rowCount();
 
if($num > 0) {

    $grpy_arr = array();
    $grpy_arr['records'] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

        if ($rest) {
            $grpy_item = array(
                "id" =>  $row['id'],
                "offer" => $row['offer'],
                "timeStart" => date_format(date_create($row['time_start']), 'H:ia'),
                "timeEnd" => date_format(date_create($row['time_end']), 'H:ia'),
                "timeCutoff" => date_format(date_create($row['time_cutoff']), 'H:ia'),
                "peopleTotal" => $row['max_pp'],
                "peopleMin" => $row['min_pp'],
                "peopleJoining" => $row['cur_pp']
            );
        } else {
    
            $grpy_item = array(
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

        }

        array_push($grpy_arr['records'], $grpy_item);
    }
 
    http_response_code(200);
    echo json_encode($grpy_arr);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "Groopy does not exist."));
}
?>