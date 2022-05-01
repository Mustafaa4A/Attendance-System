<?php

header("Content-Type: Application/json");
include("../Common/database.php");
$action = $_POST['action'];


function read($conn)
{
    extract($_POST);
    $query = "CALL Student_read_sp('$studentID')";
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
    $query = "CALL Student_delete_sp('$studentID')";
    $result = $conn->query($query);

    if ($result) {
        $result_data = array("status" => true, "message" => "Admin has been deleted successfully.");
    } else {
        $result_data = array("status" => false, "message" => $conn->error());
    }

    echo json_encode($result_data);
}



function insert($conn)
{
    extract($_POST);
    $query = "CALL Student_sp('$studentID','$studentName','$gender','$classID', '$email','$tell','$action')";

    $result = $conn->query($query);

    if ($result) {
        $result_data = array("status" => true, "message" => "Student has been inserted successfully.");
    } else {
        $result_data = array("status" => false, "message" => $conn->error());
    }

    echo json_encode($result_data);
}
function update($conn)
{
    extract($_POST);
    $query = "CALL Student_sp('$studentID','$studentName','$gender','$classID', '$email','$tell','$action')";
    $result = $conn->query($query);

    if ($result) {
        $result_data = array("status" => true, "message" => "Student has been updated successfully.");
    } else {
        $result_data = array("status" => false, "message" => $conn->error());
    }

    echo json_encode($result_data);
}


function getClass($conn)
{
    extract($_POST);
    $query = "CALL 	get_class()";
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