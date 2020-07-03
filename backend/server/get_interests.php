<?php
session_start();

//Set headers to disable CORS errors
header("Access-Control-Allow-Origin: *");

//Require connection to the database
require('../connect.php');

//Process the information contained in SESSION if it exists
if(!empty($_SESSION)) {

    //Get user id from the user session variable.
    $userId = $_SESSION["id"];

    //Pull activity score out of the axios object.
    $activityScore = $_SESSION["activity_score"];

    //Send user id and activity score to database to retrieve category id's that contain those criteria.
    if($activityScore || $activityScore === 0) {
        $requestQuery = "SELECT `activity_id` FROM `request_table` WHERE `user_id`=" . $userId . " AND `activity_score`=" . $activityScore . " ";
    }
    else{
        //If no heart rate data is found return all activities.
        $requestQuery = "SELECT `activity_id` FROM `request_table` WHERE `user_id`=" . $userId  . " ";
    }
    $requestResult = mysqli_query($conn, $requestQuery);
    while($requestRow = mysqli_fetch_assoc($requestResult)){
        $requestData[]=$requestRow;
    };

    //Send the results from the prior query to our database to retrieve the category id's associated with those
    //activities.
    $requestCount = count($requestData);
    if($requestCount>0) {
        $activityQuery = "SELECT `category_id`,`description` FROM `activity_table` WHERE ";

        for ($i = 0; $i < $requestCount; $i++) {
            if ($i === 0) {
                $activityQuery .= " `id`=" . $requestData[$i]['activity_id'] . " ";
            } else {
                $activityQuery .= " OR `id`=" . $requestData[$i]['activity_id'] . " ";
            }
        }
        $activityResult = mysqli_query($conn, $activityQuery);
        while ($activityRow = mysqli_fetch_assoc($activityResult)) {
            $activityData[] = $activityRow;
        };
        //Transform our new data back to json to send back to our JavaScript file.
        $activityData = json_encode($activityData);
        print_r($activityData);
    }
    //If the user contains no interests at the activity level that they've received then we return all categories
    else{
        $activityQuery = "SELECT `category_id`,`description` FROM `activity_table`";
        $activityResult = mysqli_query($conn, $activityQuery);
        while ($activityRow = mysqli_fetch_assoc($activityResult)) {
            $activityData[] = $activityRow;
        };
        //Transform our new data back to json to send back to our JavaScript file.
        $activityData = json_encode($activityData);
        print_r($activityData);
    }
}
else{
    echo "No User Stats";
}
