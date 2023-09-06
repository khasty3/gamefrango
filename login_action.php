<?php
// Incluir o arquivo de conexão
require 'conexao.php';

if(isset($_POST['nick'])) {
    $nick = $_POST['nick'];

    // Usando declaração preparada para verificar o valor de nick no banco de dados
    $stmt = $conn->prepare("SELECT usuarios.id as user_id, usuarios.nick, skins_cabeca.cabeca, skins_corpo.corpo
                            FROM usuarios
                            LEFT JOIN skins as skins_cabeca ON usuarios.cabeca = skins_cabeca.id
                            LEFT JOIN skins as skins_corpo ON usuarios.corpo = skins_corpo.id
                            WHERE usuarios.nick = ?");
    $stmt->bind_param("s", $nick);
    $stmt->execute();

    $result = $stmt->get_result();

    if($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $user_id = $row['user_id'];
        $cabeca = $row['cabeca'];
        $corpo = $row['corpo'];

        echo json_encode([
            "status" => "success",
            "message" => "Login bem-sucedido!",
            "nick" => $nick,
            "user_id" => $user_id,
            "cabeca" => $cabeca,
            "corpo" => $corpo
        ]);
    } else {
        echo "Nick não encontrado!";
    }

    $stmt->close();
}


// Fechar conexão
$conn->close();
?>
