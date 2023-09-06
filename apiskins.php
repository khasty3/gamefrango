<?php
header('Content-Type: application/json');

// Connect to the database (keep your connection as is)
require 'conexao.php';

$userId = isset($_POST['user_id']) ? (int)$_POST['user_id'] : 0;

$stmt = $conn->prepare("SELECT * FROM skins WHERE user = ?");
$stmt->bind_param('i', $userId);  // 'i' indicates the parameter is an integer

$stmt->execute();

$result = $stmt->get_result();
$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);

$stmt->close();
$conn->close();
