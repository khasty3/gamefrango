<?php
// Incluir o arquivo de conexão
require 'conexao.php';

if(isset($_POST['nick']) && isset($_POST['cabeca'])) {
    $nick = $_POST['nick'];
    $cabeca = $_POST['cabeca'];

$stmt = $conn->prepare("UPDATE usuarios SET cabeca = ? WHERE nick = ?");
$stmt->bind_param("is", $cabeca, $nick);
}
if(isset($_POST['nick']) && isset($_POST['corpo'])) {
    $nick = $_POST['nick'];
    $corpo = $_POST['corpo'];

$stmt = $conn->prepare("UPDATE usuarios SET corpo = ? WHERE nick = ?");
$stmt->bind_param("is", $corpo, $nick);
}

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo "Atualização feita com sucesso";
    } else {
        echo "Nenhum usuário com esse nick foi encontrado ou o valor já era 2.";
    }
} else {
    echo "Erro ao atualizar: " . $conn->error;
}

$stmt->close();
