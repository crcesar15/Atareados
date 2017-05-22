<?php

require_once'conexion.php';
$user = $_POST['user'];
$pass = $_POST['password'];

$sql = "SELECT * FROM usuarios where usuario = '$user'";
//echo ($sql);
$stmt = sqlsrv_query( $conn, $sql);

if( $stmt === false) {
    die( print_r( sqlsrv_errors(), true) );
}

if (sqlsrv_has_rows($stmt)) {
  while ($row = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)) {
    if ($row['pass_usuario'] === $pass) {
      session_start();
      $_SESSION['id'] = $row['id_usuario'];
      $a = "1";
      break;
    }else {
      $a = "Contraseña Incorrecta";
    }
  }
} else {
  $a = "Usuario Inexistente";
}

echo $a;


 ?>
