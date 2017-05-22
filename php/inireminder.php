<?php
require_once 'conexion.php';
session_start();
$id = $_SESSION['id'];
$i = 0;
$sql = "SELECT TOP 3 recordatorio.id_nota,titulo_rec,fecha_rec,color,nombre_materia,texto_rec FROM recordatorio join notas on recordatorio.id_nota = notas.id_nota join cursa on notas.id_materia = cursa.id_materia join materia on cursa.id_materia=materia.id_materia where cursa.id_usuario = $id ORDER BY fecha_rec DESC";
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
