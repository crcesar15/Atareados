<?php
require_once 'conexion.php';
 $tag = $_POST['name'];
 $ap = $_POST['ap'];
 $mail = $_POST['mail'];
 $ci = $_POST['ci'];
 $num = 0;
 $user = substr($tag,0,3);
 $user.=substr($ap,0,3);
 $user = strtoupper($user);
 $ced = $ci;
 for ($i=0; $i < strlen($ced) ; $i++) {
   $num = $num + ($ced % 10);
   $ced = $ced / 10;
 }
 $num = $num % 9;
 $user .=$num;
 $user .=substr($ci,0,2);

 $sql = "insert into usuarios values (".$ci.",'".$tag."','".$ap."','".$mail."','".$user."','".$ci."');";

 $recurso=sqlsrv_prepare($conn,$sql);
 if(sqlsrv_execute($recurso)){
   $e = array('user'=>$sql,'pass'=>$ci);
   $e = json_encode($e);
   echo ($e);
  }


?>
