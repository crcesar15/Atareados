<?php
require_once'conexion.php';
session_start();
$id = $_SESSION['id'];
$nota = $_SESSION['nota'];
$fecha = $_POST['rdate'];
$hora = $_POST['rhour'];
$fecha = $fecha." ".$hora.":00";
$titulo = $_POST['rtitle'];
$desc = $_POST['rdesc'];

$sql = "DELETE from recordatorio where id_nota = $nota";
$recurso=sqlsrv_prepare($conn,$sql);
if (sqlsrv_execute($recurso)) {
  $sql = "INSERT INTO recordatorio values ($id,$nota,'$fecha','$titulo','$desc')";
  $recurso=sqlsrv_prepare($conn,$sql);
  if(sqlsrv_execute($recurso)){
    echo "1";
  }else {
    echo "0";
  }
}else {
  echo "0";
}

 ?>
