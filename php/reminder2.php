<?php
require_once 'conexion.php';
session_start();
$id = $_SESSION['id'];
$nota = $_SESSION['nota'];
$sql = "SELECT fecha_rec,titulo_rec,texto_rec FROM recordatorio WHERE id_nota = $nota and id_usuario = $id;";
$stmt  = sqlsrv_query($conn,$sql);
if ($row = sqlsrv_fetch_array($stmt)) {
  $row = json_encode($row);
  echo($row);
}else {
  echo "0";
}
?>
