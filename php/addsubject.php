<?php
session_start();
require_once 'conexion.php';
$i=1;
$mat = $_POST['id'];
$id = $_SESSION['id'];
$num = $_POST['num'];
$color = $_POST['color'];

if (strlen($mat) > 2) {
  //nueva materia
  $sql = "INSERT INTO materia values ('$mat')";
  $recurso=sqlsrv_prepare($conn,$sql);
  if (sqlsrv_execute($recurso)) {
    //materia creada
    $sql = "SELECT * FROM viewMat('$mat')";
    $stmt = sqlsrv_query($conn,$sql);
    $row = sqlsrv_fetch_array($stmt);
    $mat = $row['id_materia'];
  }else {
    echo "Error, Intente más Tarde";
  }
}
$sql = "SELECT id_materia FROM cursa where id_usuario = $id and id_materia = $mat";
$stmt = sqlsrv_query($conn,$sql);
if (!$row = sqlsrv_fetch_array($stmt)) {
  $sql = "INSERT INTO cursa values($id,$mat,'$color')";
  $recurso=sqlsrv_prepare($conn,$sql);
  if (sqlsrv_execute($recurso)) {
    if ($num > 0) {
      for ($i=1; $i <=$num ; $i++) {
        $dia = $_POST["dia".$i];
        $ini = $_POST["ini".$i];
        $fin = $_POST["fin".$i];
        $sql = "INSERT INTO horario values($id,$mat,$dia,'$ini','$fin');";
        $recurso=sqlsrv_prepare($conn,$sql);
        if (sqlsrv_execute($recurso)) {
          //materia relacionada con usuarios
        }
      }
    }
    echo "2";
  }else
  echo "0";
}else {
  echo "1";
}
 ?>
