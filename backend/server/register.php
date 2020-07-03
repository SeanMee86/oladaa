<?php
session_start();

//Set headers to avoid CORS errors
header("Access-Control-Allow-Origin: *");

//Require connection to the database
require_once("../connect.php");

//Catch the json object sent from our axios call and convert it into php readable code.
$userInfo = json_decode(file_get_contents('php://input'), true);

//If user info contains information, then process it.
if(isset($userInfo) && !empty($userInfo)){

    //Pull the username, password, and email out of the axios object
    //Escape special characters in the username and email to help avoid sql injection
    $username = mysqli_real_escape_string($conn, $userInfo["username"]);
    $email = mysqli_real_escape_string($conn, $userInfo["email"]);
    //Hash the users password with the default algorithm for security
    $password = password_hash($userInfo["password"],PASSWORD_DEFAULT);

    //Insert the new users information into the database.
    $sql = "INSERT INTO `user_table` (username, password, email) VALUES ('$username','$password','$email')";
    $result = mysqli_query($conn, $sql);

    //Send success message on successful registration
    if($result){
        echo "User Registration Successful";
    }
    //send error message along with the mySQL error if registration fails
    else{
        $result["error"][]="User Registration Failed";
        $result["error"][]=(mysqli_error($conn));
        print_r(json_encode($result));
    }
}
?>