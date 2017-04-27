<?php

session_start();
require_once 'conexion.php';
$id = $_SESSION['id'];
$ruta = './profilePhotos/';

foreach ($_FILES as $key ) {
  if ($key['error'] == UPLOAD_ERR_OK) {
    $temp = $key['tmp_name'];
    $des = $ruta.$id.".jpg";
    $sql = "UPDATE usuarios SET fotografia = '$des' WHERE id_usuario = $id";
    $recurso=sqlsrv_prepare($conn,$sql);
    if (sqlsrv_execute($recurso)) {
      move_uploaded_file($temp,$des);
      echo('lol?');
    }else {
      echo "fallo";
    }
  }else {
    echo ("fallo");
  }
}

 ?>
