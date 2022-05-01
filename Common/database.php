<?php

include "constant.php";
session_start();

$conn = new mysqli(SERVER_NAME,USERNAME,PASSWORD,DATABASE);
if($conn->connect_error){
    die("connection failed :" .$conn->connect_error);
}
