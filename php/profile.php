<?php
require_once 'conexion.php';
session_start();
$id = $_SESSION['id'];

$sql = "SELECT * FROM usuarios WHERE id_usuario = $id;";
$stmt  = sqlsrv_query($conn,$sql);
$row = sqlsrv_fetch_array($stmt);
$row = json_encode($row);
echo($row);
 ?>
