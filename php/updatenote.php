<?php
require_once 'conexion.php';
session_start();
$nota = $_SESSION['nota'];
$id = $_SESSION['id'];
$mat = $_POST['subject'];
$title = $_POST['title'];
$desc = $_POST['about'];
$n = $_POST['numfiles'];
$date = $_POST['fecha'];
$flag = 1;
$sql = "UPDATE notas SET id_materia = $mat, titulo = '$title',descripcion = '$desc' WHERE id_nota = $nota;";
$recurso=sqlsrv_prepare($conn,$sql);
if (sqlsrv_execute($recurso)) {
  $sql = "DELETE from archivo where id_nota = $nota";
  $recurso=sqlsrv_prepare($conn,$sql);
  if(sqlsrv_execute($recurso)){
    for ($i=1; $i <=$n ; $i++) {
      $name = "file".$i;
      $link = $_POST[$name];
      $tipo = end(explode(".", $link));
      $link = "files/".$id."/".$link;
      $sql = "INSERT INTO archivo VALUES ($nota,'$link','$tipo');";
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

}else {
  $flag = 1;
}

if ($flag == 0) {
  echo 0;
}else {
  echo $nota;
}
 ?>
