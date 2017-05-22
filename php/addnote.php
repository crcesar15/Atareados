<?php
require_once 'conexion.php';
session_start();
$id = $_SESSION['id'];
$mat = $_POST['subject'];
$title = $_POST['title'];
$desc = $_POST['about'];
$n = $_POST['numfiles'];
$date = $_POST['fecha'];
$flag = 1;
$sql = "INSERT INTO notas VALUES ($id,$mat,'$date','$desc','$title');";
$recurso=sqlsrv_prepare($conn,$sql);
if (sqlsrv_execute($recurso)) {
  $sql = "SELECT id_nota from notas where id_usuario = $id and id_materia = $mat and dateinfo = '$date' ";
  $stmt  = sqlsrv_query($conn,$sql);
  $row = sqlsrv_fetch_array($stmt);
  $idnota = $row[0];
  for ($i=1; $i <=$n ; $i++) {
    $name = "file".$i;
    $link = $_POST[$name];
    $tipo = end(explode(".", $link));
    $link = "files/".$id."/".$link;
    $sql = "INSERT INTO archivo VALUES ($idnota,'$link','$tipo');";
    $recurso=sqlsrv_prepare($conn,$sql);
    if (sqlsrv_execute($recurso)) {
        $flag = 0;
    }else {
      $flag = 1;
    }
  }
}else {
  $flag = 1;
}

if ($flag == 0) {
  echo 0;
}else {
  echo $idnota;
}
 ?>
