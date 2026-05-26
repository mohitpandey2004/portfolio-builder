<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['user_name']);
    $title = htmlspecialchars($_POST['user_title']);
    $about = htmlspecialchars($_POST['user_about']);
    $email = htmlspecialchars($_POST['user_email']);
    $phone = htmlspecialchars($_POST['user_phone']);
    $location = htmlspecialchars($_POST['user_location']);

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

        header('Content-Type: application/zip');
        header('Content-Disposition: attachment; filename="' . $zip_name . '"');
        header('Content-Length: ' . filesize($zip_name));
        readfile($zip_name);
        unlink($zip_name);
        exit;
    } else {
        echo "Bhai, Zip file banane me koi dikkat aayi hai!";
    }
}
?>