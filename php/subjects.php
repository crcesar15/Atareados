<?php
  require_once 'conexion.php';
  session_start();
  $id = $_SESSION['id'];
  $i = 0;
  $sql = "SELECT materia.id_materia, nombre_materia from materia join cursa on materia.id_materia=cursa.id_materia where id_usuario = $id";
  $stmt = sqlsrv_query($conn,$sql);
  $rows = sqlsrv_has_rows($stmt);
  if ($rows === true){
    while ($row = sqlsrv_fetch_array($stmt)) {
      $v[$i] = json_encode($row);
      $i = $i+1;
    }
    echo json_encode($v);
  }
 ?>
