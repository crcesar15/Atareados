<?php
session_start();
$id = $_SESSION["id"];
$target_path = "../files/".$id."/";
$name = $_POST["name"];
if(unlink($target_path.$name))
{
  echo 0;
} else{
  echo "Ha ocurrido un error, trate de nuevo!";
}

 ?>
