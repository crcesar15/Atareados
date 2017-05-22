<?php

session_start();
require_once 'conexion.php';
$id = $_SESSION['id'];
$ruta = '../profilePhotos/';
$sql = "SELECT fotografia FROM usuarios WHERE id_usuario = $id;";
$stmt  = sqlsrv_query($conn,$sql);
$row = sqlsrv_fetch_array($stmt);
unlink('.'.$row[0]);

foreach ($_FILES as $key ) {
  if ($key['error'] == UPLOAD_ERR_OK) {
    $temp = $key['tmp_name'];
    $hoy = getdate();
    $des = $ruta.$id.$hoy[0].".jpg";
    $dest = './profilePhotos/'.$id.$hoy[0].".jpg";
    $sql = "UPDATE usuarios SET fotografia = '$dest' WHERE id_usuario = $id";
    $recurso=sqlsrv_prepare($conn,$sql);
    if (sqlsrv_execute($recurso)) {
      move_uploaded_file($temp,$des);

      //inicio redimensionar imagen
      $url = $des;
      $infoimage = getimagesize($url);
      $src_image = imagecreatefromjpeg($url);
      $h_img = $infoimage[1];
      $w_img = $infoimage[0];


      if ($h_img > $w_img) {
        $a = $h_img - $w_img;
        $a = $a/2;
        echo ($a);

        $src_w = $w_img;
        $src_h = $w_img;

        $src_x = 0;
        $src_y = $a;

        $dst_x = 0;
        $dst_y = 0;

        $dst_w = 600;
        $dst_h = 600;

      }else {
        $a = $w_img - $h_img ;
        $a = $a/2;
        echo ($a);

        $src_w = $h_img;
        $src_h = $h_img;

        $src_x = $a;
        $src_y = 0;

        $dst_x = 0;
        $dst_y = 0;

        $dst_w = 600;
        $dst_h = 600;

      }

      $dst_image = imagecreatetruecolor($dst_w,$dst_h);

      imagecopyresampled(
        $dst_image,
        $src_image,
        $dst_x,
        $dst_y,
        $src_x,
        $src_y,
        $dst_w,
        $dst_h,
        $src_w,
        $src_h);

      imagejpeg($dst_image,$des,100);

      //fin redimensionar imagen
      echo('lol?');
    }else {
      echo "fallo";
    }
  }else {
    echo ("fallo");
  }
}

 ?>
