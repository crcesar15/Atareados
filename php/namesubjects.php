<?php
//  echo("hola");
  require_once 'conexion.php';
  $mat = $_POST['id'];
  $sql = "SELECT nombre_materia from materia where id_materia = $mat";
  $stmt = sqlsrv_query($conn,$sql);
  $row = sqlsrv_fetch_array($stmt);
  $a = json_encode($row);
  echo($a);
 ?>
