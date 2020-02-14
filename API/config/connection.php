<?php

function connect(){
	$db_host="localhost";
    $db_user="user";
    $db_pass="qmet";
    $db_name="qmet";
	$db_connect = new PDO("mysql:host=$db_host; dbname=$db_name", $db_user, $db_pass);
	$db_connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	//echo "Connected successfully"; 
	return $db_connect;
}

?>