<?php
require_once'conexion.php';
session_start();
$id = $_SESSION['id'];
$nota = $_SESSION['nota'];
$i = 0;
$files=[];

if (sqlsrv_begin_transaction($conn)) {

  $sql = "DELETE from recordatorio where id_nota = $nota;";
  $recurso=sqlsrv_prepare($conn,$sql);
  if (sqlsrv_execute($recurso)) {
    $sql = "SELECT link from archivo WHERE id_nota = $nota";
    $stmt  = sqlsrv_query($conn,$sql);
    while ($row = sqlsrv_fetch_array($stmt)) {
      $files[$i] = "../".$row[0];
      $i = $i + 1;
    }
    $sql = "DELETE from archivo where id_nota = $nota;";
    $recurso=sqlsrv_prepare($conn,$sql);
    if (sqlsrv_execute($recurso)) {
        $sql = "DELETE from notas where id_nota = $nota and id_usuario = $id;";
        $recurso=sqlsrv_prepare($conn,$sql);
        if (sqlsrv_execute($recurso)) {
          sqlsrv_commit( $conn );
          for ($j=0; $j < $i ; $j++) {
            unlink($files[$j]);
          }
          echo "1";
        }else {
          sqlsrv_rollback( $conn );
          echo "0";
        }
    }else{
      sqlsrv_rollback( $conn );
      echo "0";
    }

  }else {
    sqlsrv_rollback( $conn );
    echo "0";
  }
}else {
  echo "0";
}
 ?>
