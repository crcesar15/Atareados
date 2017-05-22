<?php
require_once 'conexion.php';
session_start();
$id = $_SESSION['id'];
$i = 0;
$sql = "SELECT TOP 3 notas.id_nota,titulo,dateinfo,color,nombre_materia,descripcion FROM notas join  materia on materia.id_materia = notas.id_materia join cursa on notas.id_materia = cursa.id_materia where cursa.id_usuario = $id ORDER BY dateinfo DESC";
$stmt = sqlsrv_query($conn,$sql);
$rows = sqlsrv_has_rows($stmt);
if ($rows === true){
  while ($row = sqlsrv_fetch_array($stmt)) {
    $v[$i] = json_encode($row);
    $i = $i+1;
  }
  echo json_encode($v);
}else {
  echo "No hay resulados";
}

 ?>
