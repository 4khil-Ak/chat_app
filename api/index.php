<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

require(__DIR__ . "/core.php");
require(__DIR__ . "/rest.php");

if(!isset($_GET['user'])){
    apiError("No user specified");
}

if(!isset($_GET['method'])){
    apiError("No method specified");
}

if(!in_array($_GET['method'], $allowed_methods)){
    apiError("This method is not allowed");
}

$user = $_GET['user'];
$method = $_GET['method'];

try {
    call_user_func(($user).'::'.camelcase($method));
}catch(Exception $e){
    apiError("Method don't exist!");
}

?>