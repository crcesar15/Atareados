<?php
require_once 'conexion.php';
session_start();
$id = $_SESSION['id'];
$mat = $_POST['id'];
$sql = "DELETE FROM cursa WHERE id_materia = $mat and id_usuario = $id";
$recurso=sqlsrv_prepare($conn,$sql);
if (sqlsrv_execute($recurso)) {
  echo ($id);
}
 ?>
