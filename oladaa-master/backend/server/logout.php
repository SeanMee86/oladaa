<?php
//Access the current session.
session_start();

//Destroy the session key.
session_destroy();

//return success for testing purposes on logout
$output = [
    'success' => true
];

print(json_encode($output));