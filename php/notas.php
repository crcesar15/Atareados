<?php
$nota =$_GET['nota'];
session_start();
$_SESSION['nota'] = $nota;
header('Location: ../view.html');
 ?>
