<?php
 //$destino = "Atareados.emi@gmail.com";
 $asunto = "Hola";
 $texto = "LoL \n banana";
 $destino = "crcesar15@gmail.com";
 $success = mail($destino,$asunto,$texto);
if ($success == true) {
  echo "funciona";
} else {
  echo "LauraSAD";
}

 ?>
