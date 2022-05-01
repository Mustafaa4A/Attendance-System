<?php

header("Content-Type: Application/json");
include("../Common/database.php");
$action = $_POST['action'];


function getClass($conn)
{
    extract($_POST);
    $query = "CALL 	get_class_sp()";
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


function read($conn)
{
    extract($_POST);
    $query = "CALL class_students('$classId', '$courseID', '$date')";
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



function getCourse($conn)
{
    extract($_POST);
    $query = "CALL get_course()";
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
    $query = "CALL admin_delete_sp('$adminID')";
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
    $count = count($student_id);
    for ($i = 0; $i < $count; $i++) {
        $query = "CALL attendance_sp('$student_id[$i]','$class_id','$course_id','$student_status[$i]','$date')";
        $conn = new mysqli(SERVER_NAME, USERNAME, PASSWORD, DATABASE);

        $result = $conn->query($query);

        $result_data = [];
        if ($result) {
            // $row = $result->fetch_assoc();
            // echo $row['message'];
            // return;
            $result_data = array('status' => true, 'message' => 'Student Attendance has been saved successfully');
        } else {
            $result_data = array('status' => false, 'message' => $conn->error);
        }
    }
    // if($result){
    //     $result_data = array("status" => true, "message"=>"Admin has been inserted successfully.");
    // }else{
    //     $result_data = array("status" => false, "message"=>$conn->error());
    // }
    echo json_encode($result_data);
}
function update($conn)
{
    extract($_POST);
    $query = "CALL admin_sp('$adminID','$adminName','$password','$action')";
    $result = $conn->query($query);

    if ($result) {
        $result_data = array("status" => true, "message" => "Admin has been updated successfully.");
    } else {
        $result_data = array("status" => false, "message" => $conn->error());
    }

    echo json_encode($result_data);
}



if (isset($action)) {
    $action($conn);
} else {
    echo json_encode(array("status" => false, "message" => "not found"));
};
