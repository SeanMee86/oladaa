<?php
//Start the session.
session_start();

//Set headers to avoid CORS errors
header("Access-Control-Allow-Origin: *");

//Require connection to the database.
require('../connect.php');

//Catch the json object sent from our axios call and convert it into php readable code.
$userInterests = json_decode(file_get_contents('php://input'), true);

//If user interests contains information, then process it.
if(!empty($userInterests)){

    //Get user id from the user session.
    $userId = $_SESSION["id"];

    //Pull activity id out of the axios object.  Activity id will be an array.
    $activityId = $userInterests['idArray'];

    //Loop through activity id array.
    $activityCount = count($activityId);
    $sql = "INSERT INTO request_table(user_id, activity_id, activity_score) VALUES ";
    for($i=0; $i<$activityCount; $i++) {
        //Insert each activity id into the request table along with the user id and the activity score associated with
        //the activity id.
        $sql .= "($userId,$activityId[$i],(SELECT score FROM activity_table 
        WHERE id=$activityId[$i])),";
    }
    $sql = substr($sql,0,-1);
    $result = mysqli_query($conn, $sql);
    if($result){
        echo "Interests Sent";
    }else{
        echo mysqli_error($conn);
    }
}