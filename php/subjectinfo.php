<?php
session_start();
require_once 'conexion.php';
$i = 0;
$id=$_SESSION['id'];
$mat = $_POST['mat'];
$sql = "SELECT id_dia,hora_ini,hora_fin from horario where id_materia = $mat and id_usuario = $id";
$stmt  = sqlsrv_query($conn,$sql);
$rows = sqlsrv_has_rows($stmt);
if ($rows === true){
  while ($row = sqlsrv_fetch_array($stmt)) {
    $v[$i] = json_encode($row);
    $i = $i+1;
  }
  echo json_encode($v);
}


 ?>
