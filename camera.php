<?php
$ruta = './js/';
$i = $_GET['num'];

foreach ($_FILES as $key ) {
  if ($key['error'] == UPLOAD_ERR_OK) {
    $temp = $key['tmp_name'];
    $des = $ruta."image".$i.".jpg";
    move_uploaded_file($temp,$des);
    echo('lol?');
  }
}
 ?>
