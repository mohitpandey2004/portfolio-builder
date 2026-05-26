<?php
// Sabse pehli line par bina kisi space ke ob_start chalana hai taaki headers miss na hon
ob_start();

// ==================== 1. POSTGRESQL ONLINE CONFIG ====================
$host = "dpg-d8al6bu7r5hc73ehhmv0-a.oregon-postgres.render.com";
$port = "5432";               
$dbname = "mohit_portfolio";   
$user = "mohit";           
$password = "ejAM4ZN2L5XitWL8d183Kk5fgOXygVzM";  

try {
    // Render Cloud Secure Connection parameters with SSL
    $dsn = "pgsql:host=$host;port=$port;dbname=$dbname;user=$user;password=$password;sslmode=require";
    $pdo = new PDO($dsn);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // ==================== 2. MAIN REQUEST HANDLING ====================
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $name = htmlspecialchars($_POST['user_name']);
        $title = htmlspecialchars($_POST['user_title']);
        $about = htmlspecialchars($_POST['user_about']);
        $email = htmlspecialchars($_POST['user_email']);
        $phone = htmlspecialchars($_POST['user_phone']);
        $location = htmlspecialchars($_POST['user_location']);

        // Optional: Agar tum portfolio generator ka data bhi table me track karna chahte ho
        // SQL insert query yahan daal sakte ho jaise contact form me daali thi.

        // Dynamic HTML template architecture setup
        $html_content = '<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>' . $name . ' | Portfolio</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <script src="https://unpkg.com/typed.js@2.1.0/dist/typed.umd.js"></script>
</head>
<body>
    <header class="header">
        <a href="#" class="logo" data-target="home">Portfolio</a>
        <div class="navbar">
            <a href="#" class="nav-link active" data-target="home">Home</a>
            <a href="#" class="nav-link" data-target="about">About</a>
            <a href="#" class="nav-link" data-target="contact">Contact</a>
        </div>
    </header>
    <main class="main-content">
        <section class="content-section active" id="home">
            <div class="home-content">
                <h3>Hello, It\'s Me</h3>
                <h1>' . $name . '</h1>
                <h3>And I\'m a <span class="text"></span></h3>
                <p>' . $about . '</p>
                <a href="#" class="btn-box nav-link" data-target="about">More about Me</a>
            </div>
        </section>
    </main>
    <script src="app.js"></script>
</body>
</html>';

        $zip = new ZipArchive();
        $zip_name = "My_Premium_Portfolio.zip";

        if ($zip->open($zip_name, ZipArchive::CREATE | ZipArchive::OVERWRITE) === TRUE) {
            $zip->addFromString('index.html', $html_content);
            if (file_exists('style.css')) $zip->addFile('style.css', 'style.css');
            if (file_exists('app.js')) $zip->addFile('app.js', 'app.js');
            $zip->close();

            // MASTER BUFFER FIX: Zip dispatch karne se pehle output memory stream clear karna
            if (ob_get_length()) {
                ob_end_clean();
            }

            header('Content-Type: application/zip');
            header('Content-Disposition: attachment; filename="' . $zip_name . '"');
            header('Content-Length: ' . filesize($zip_name));
            header('Pragma: no-cache');
            header('Expires: 0');
            
            readfile($zip_name);
            unlink($zip_name);
            exit;
        } else {
            echo "Bhai, Zip file banane me koi dikkat aayi hai!";
        }
    }
} catch (PDOException $e) {
    if (ob_get_length()) ob_end_clean();
    echo "Bhai, Cloud connection fail ho gaya: " . $e->getMessage();
}