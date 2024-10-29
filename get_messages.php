<?php
$pdo = new PDO('mysql:host=datos-usuarios-forms.czqio4e2edcs.eu-central-1.rds.amazonaws.com;dbname=CHAT', 'admin', 'Grisuela%2');
$stmt = $pdo->query("SELECT username, message, color, timestamp FROM messages ORDER BY timestamp DESC");
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
