<?php
session_start();
session_unset($_SESSION);
header('Location: login.html');
session_destroy();

 ?>
