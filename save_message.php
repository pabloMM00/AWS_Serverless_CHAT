<?php
$data = json_decode(file_get_contents('php://input'), true);
$username = htmlspecialchars($data['username']);
$message = htmlspecialchars($data['message']);
$color = sprintf('#%06X', mt_rand(0, 0xFFFFFF));

$pdo = new PDO('mysql:host=datos-usuarios-forms.czqio4e2edcs.eu-central-1.rds.amazonaws.com;dbname=CHAT', 'admin', 'Grisuela%2');
$stmt = $pdo->prepare("INSERT INTO messages (username, message, color, timestamp) VALUES (?, ?, ?, NOW())");
$stmt->execute([$username, $message, $color]);
