<?php
// Incluir o arquivo de conexão
require 'conexao.php';

if(isset($_POST['nick'])) {
    $nick = $_POST['nick'];

    // Usando declaração preparada para inserir o valor de nick
    $stmt = $conn->prepare("INSERT INTO usuarios (nick) VALUES (?)");
    $stmt->bind_param("s", $nick);

    if ($stmt->execute()) {
        echo "Registro inserido com sucesso!";
    } else {
        echo "Erro ao inserir registro: " . $stmt->error;
    }

    $stmt->close();
}

// Fechar conexão
$conn->close();
?>
