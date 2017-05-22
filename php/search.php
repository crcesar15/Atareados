<?php
session_start();
require_once('conexion.php');

$i = 0;

$id = $_SESSION['id'];
$title = $_POST['title'];
$description = $_POST['description'];
$subject = $_POST['subject'];
$date = $_POST['date'];
$type = $_POST['type'];

$sql = "SELECT notas.id_nota,titulo,dateinfo,color,nombre_materia,descripcion FROM notas join  materia on materia.id_materia = notas.id_materia join cursa on notas.id_materia = cursa.id_materia";
$where = "WHERE notas.id_usuario = $id";

if (!$title == "") {
  $where  = $where." AND titulo like '%$title%'";
}

if (!$description == "") {
  $where  = $where." AND descripcion like '%$description%'";
}

if (!$subject == 0) {
  $where  = $where." AND notas.id_materia = $subject";
}

if (!$date == "") {
  $where  = $where." AND dateinfo BETWEEN '$date' AND '$date 23:59:59.997'";
}

if (!$type == 0) {
  $sql = "SELECT notas.id_nota,titulo,dateinfo,nombre_materia,descripcion FROM notas join archivo on notas.id_nota=archivo.id_nota join  materia on materia.id_materia = notas.id_materia join cursa on notas.id_materia = cursa.id_materia";
  $where  = $where." AND tipo like '$type%'";
}
$where = $where." ORDER BY dateinfo DESC";
$sql = $sql." ".$where;
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
