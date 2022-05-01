<?php

header("Content-Type: Application/json");
include("../Common/database.php");
$action = $_POST['action'];


function read($conn)
{
    extract($_POST);
    $LecturerID = $_SESSION['lecID'];
    $query = "CALL leccturer_dash_sp('$LecturerID')";
    $result = $conn->query($query);

    if ($result) {
        $num_rows = $result->num_rows;
        if ($num_rows > 0) {
            $data = [];
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            $result_data = array("status" => true, "message" => $data);
        } else {
            $result_data = array("status" => false, "message" => "data not found");
        }
    } else {
        $result_data = array("status" => false, "message" => $conn_error());
    }

    echo json_encode($result_data);
}




if (isset($action)) {
    $action($conn);
} else {
    echo json_encode(array("status" => false, "message" => "not found"));
}
