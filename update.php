<?php
session_start();
require_once 'conexion.php';
$tag = $_POST['name'];
$ap = $_POST['ap'];
$mail = $_POST['email'];
$user = $_POST['user'];
$pass = $_POST['password'];
$id = $_SESSION['id'];
$sql = "UPDATE usuarios SET nombre_usuario='$tag',apellido_usuario='$ap',email='$mail',usuario='$user',pass_usuario='$pass' WHERE id_usuario = $id;";
$recurso=sqlsrv_prepare($conn,$sql);
if (sqlsrv_execute($recurso)) {
  echo(1);
}else {
  echo "fallo";
}

 ?>
