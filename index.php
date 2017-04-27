<?php
session_start();
if (isset($_SESSION['id'])) {
  header('Location: inicio.html');
}else {
  header('Location: login.html');
}
 ?>
