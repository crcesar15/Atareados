<?php
require_once'conexion.php';
session_start();
$id = $_SESSION['id'];
$nota = $_SESSION['nota'];

$sql = "DELETE from recordatorio where id_nota = $nota";
$recurso=sqlsrv_prepare($conn,$sql);
if (sqlsrv_execute($recurso)) {
  echo "1";
}else {
  echo "0";
}

 ?>
