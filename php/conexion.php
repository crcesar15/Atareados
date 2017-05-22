<?php
$serverName = "192.168.43.162";
$connectionInfo = array("Database"=>"atareados", "UID"=>"sa", "PWD"=>"123456","CharacterSet" => "UTF-8");
$conn = sqlsrv_connect($serverName, $connectionInfo);
if( $conn === false ) {
  die( print_r( sqlsrv_errors(), true));
}
 ?>
