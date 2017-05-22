<?php
session_start();
require_once 'conexion.php';
$id = $_SESSION['id'];
$nota = $_SESSION['nota'];
$sql = "SELECT link,tipo from archivo where id_nota = $nota";
$stmt = sqlsrv_query($conn,$sql);
if ($row = sqlsrv_fetch_array($stmt)) {
  $v[0] = json_encode($row);
  echo json_encode($v);
}else {
  echo "No hay resulados";
}
 ?>
