<?php

header("Content-Type: Application/json");
include("../Common/database.php");
$action = $_POST['action'];


function read($conn)
{
    extract($_POST);
    $query = "CALL users_read_sp('$userID')";
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


function delete($conn)
{
    extract($_POST);
    $query = "CALL users_delete_sp('$userID')";
    $result = $conn->query($query);

    if ($result) {
        $result_data = array("status" => true, "message" => "Lecturer has been deleted successfully.");
    } else {
        $result_data = array("status" => false, "message" => $conn->error());
    }

    echo json_encode($result_data);
}



function insert($conn)
{
    extract($_POST);
    $query = "CALL users_sp('$userID','$username','$password','$status','$date','$lecturerID','$action')";

    $result = $conn->query($query);

    if ($result) {
        $result_data = array("status" => true, "message" => "User has been inserted successfully.");
    } else {
        $result_data = array("status" => false, "message" => $conn->error());
    }

    echo json_encode($result_data);
}
function update($conn)
{
    extract($_POST);
    $query = "CALL users_sp('$userID','$username','$password','$status','$date','$lecturerID','$action')";
    $result = $conn->query($query);

    if ($result) {
        $result_data = array("status" => true, "message" => "User has been updated successfully.");
    } else {
        $result_data = array("status" => false, "message" => $conn->error());
    }

    echo json_encode($result_data);
}




if (isset($action)) {
    $action($conn);
} else {
    echo json_encode(array("status" => false, "message" => "not found"));
}
