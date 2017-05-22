<?php
  session_start();
  $id = $_SESSION["id"];
  $target_path = "../files/".$id."/";
  $archivo = $_FILES['file'];
  $name = $archivo["name"];
  $extension = end(explode(".", $name));
  $name = basename($name, ".".$extension);
  sleep(1);
  $hoy = getdate();
  $hoy = $hoy['mday']."-".$hoy['mon']."-".$hoy['year']."_".$hoy['hours']."h".$hoy['minutes']."m".$hoy['seconds'];
  $name = $name."_".$hoy.".".$extension;
  $temp = $archivo['tmp_name'];
  if(move_uploaded_file($temp, $target_path.$name))
  {
    echo $name;
  } else{
    echo "Ha ocurrido un error, trate de nuevo!";
  }

 ?>
