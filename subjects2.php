<?php
  require_once 'conexion.php';
  session_start();
  $id = $_SESSION['id'];
  $i = 0;
  $data = $_POST['query'];
  $sql = "SELECT id_materia,nombre_materia FROM materia where nombre_materia like '%$data%' ";
  $stmt = sqlsrv_query($conn,$sql);
  $rows = sqlsrv_has_rows($stmt);
  if ($rows === true){
    while ($row = sqlsrv_fetch_array($stmt)) {
      $v[$i] = json_encode($row);
      $i = $i+1;
    }
    echo json_encode($v);
  }
  //echo $data;
 ?>
