<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "frangoz";

// Criar conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Retornar a conexão para ser utilizada em outros arquivos
return $conn;
?>
