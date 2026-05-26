<?php
// Sabse pehli line par bina kisi space ke ob_start chalana hai
ob_start();

// ==================== 1. POSTGRESQL CONNECTION CONFIG ====================
$host = "localhost";
$port = "5432";               
$dbname = "mohit_portfolio";   
$user = "postgres";           
$password = "143Papa#@";  

try {
    $dsn = "pgsql:host=$host;port=$port;dbname=$dbname;user=$user;password=$password";
    $pdo = new PDO($dsn);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // ==================== 2. MAIN REQUEST HANDLING ====================
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        
        // ----------------- CONDITION A: PORTFOLIO BUILDER FORM -----------------
        if (isset($_POST['user_name'])) {
            
            $name = htmlspecialchars($_POST['user_name']);
            $title = htmlspecialchars($_POST['user_title']);
            $typed_text = htmlspecialchars($_POST['user_typed_text']); 
            $about = htmlspecialchars($_POST['user_about']);
            $skills_raw = htmlspecialchars($_POST['user_skills']); 
            $email = htmlspecialchars($_POST['user_email']);
            $phone = htmlspecialchars($_POST['user_phone']);
            $location = htmlspecialchars($_POST['user_location']);

            // Skills HTML tags generate karna
            $skills_array = explode(',', $skills_raw);
            $skills_html = "";
            $i = 1;
            foreach ($skills_array as $skill) {
                if(!empty(trim($skill))) {
                    $skills_html .= '<span class="skill-tag" style="--i:' . $i . '">' . trim($skill) . '</span>' . "\n";
                    $i++;
                }
            }

            // Animation arrays format karna Typed.js ke liye
            $typed_array = explode(',', $typed_text);
            $typed_formatted = [];
            foreach ($typed_array as $item) {
                if(!empty(trim($item))) {
                    $typed_formatted[] = '"' . trim($item) . '"';
                }
            }
            $js_strings = implode(', ', $typed_formatted);

            // ==================== PREMIUM LIVE CODE TEMPLATE FOR ZIP ====================
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
            <a href="#" class="nav-link" data-target="skills">Skills</a>
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
                <div class="home-sci">
                    <a href="#"><i class="fa-brands fa-whatsapp"></i></a>
                    <a href="#"><i class="fa-brands fa-linkedin-in"></i></a>
                    <a href="#"><i class="fa-brands fa-github"></i></a>
                </div> 
                <a href="#" class="btn-box nav-link" data-target="about">More about Me</a>
            </div>
            <div class="home-img">
                <img src="user-avatar.jpg" alt="' . $name . '">
            </div>
        </section>

        <section class="content-section" id="about">
            <div class="about-container">
                <h2 class="heading">About <span>Me</span></h2>
                <div class="about-grid">
                    <div class="about-card summary-card" style="width: 100%; max-width: 800px; margin: 0 auto; background: rgba(18, 38, 54, 0.8); padding: 25px; border-radius: 8px; border: 1px solid #00eeff;">
                        <h3><i class="fa-solid fa-user-tie"></i> ' . $title . '</h3>
                        <p style="margin-top: 15px; line-height: 1.6; color: #f5f5f5;">' . $about . '</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="content-section" id="skills">
            <h2 class="heading">My <span>Skills</span></h2>
            <div class="skills-row" style="justify-content: center; display: flex;">
                <div class="skills-column" style="width: 100%; max-width: 600px; text-align: center;">
                    <div class="skills-box" style="display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; margin-top: 20px;">
                        ' . $skills_html . '
                    </div>
                </div>
            </div>
        </section>

        <section class="content-section" id="contact">
            <h2 class="heading">Contact <span>Me!</span></h2>
            <div class="contact-container" style="justify-content: center; display: flex;">
                <div class="contact-info" style="display: grid; grid-template-columns: 1fr; gap: 20px; background: rgba(18, 38, 54, 0.8); padding: 30px; border-radius: 10px; border: 1px solid #ff007f;">
                    <div class="info-box" style="display: flex; align-items: center; gap: 15px;">
                        <div class="info-icon" style="color: #00eeff; font-size: 1.5rem;"><i class="fa-solid fa-envelope"></i></div>
                        <div class="info-text"><span>Email Me</span><p>' . $email . '</p></div>
                    </div>
                    <div class="info-box" style="display: flex; align-items: center; gap: 15px;">
                        <div class="info-icon" style="color: #00eeff; font-size: 1.5rem;"><i class="fa-solid fa-phone"></i></div>
                        <div class="info-text"><span>Call Me</span><p>' . $phone . '</p></div>
                    </div>
                    <div class="info-box" style="display: flex; align-items: center; gap: 15px;">
                        <div class="info-icon" style="color: #00eeff; font-size: 1.5rem;"><i class="fa-solid fa-location-dot"></i></div>
                        <div class="info-text"><span>Location</span><p>' . $location . '</p></div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <script>
        // NAVIGATION LOGIC
        const navLinks = document.querySelectorAll(".nav-link");
        const sections = document.querySelectorAll(".content-section");

        navLinks.forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const targetSectionId = link.getAttribute("data-target");
                sections.forEach(section => section.classList.remove("active"));
                const activeSection = document.getElementById(targetSectionId);
                if (activeSection) activeSection.classList.add("active");
                navLinks.forEach(navLink => navLink.classList.remove("active"));
                const matchingNavbarLink = document.querySelector(`.navbar a[data-target="${targetSectionId}"]`);
                if (matchingNavbarLink) matchingNavbarLink.classList.add("active");
            });
        });

        // TYPED.JS
        var typed = new Typed(".text", {
            strings: [' . $js_strings . '],
            typeSpeed: 100, backSpeed: 100, backDelay: 1000, loop: true
        });
    </script>
</body>
</html>';

            $zip = new ZipArchive();
            $clean_name = preg_replace('/[^A-Za-z0-9]/', '', $name);
            $zip_name = "Portfolio_" . $clean_name . ".zip";

            if ($zip->open($zip_name, ZipArchive::CREATE | ZipArchive::OVERWRITE) === TRUE) {
                $zip->addFromString('index.html', $html_content);
                
                if (file_exists('style.css')) {
                    $zip->addFile('style.css', 'style.css');
                }
                
                if (isset($_FILES['user_image']) && $_FILES['user_image']['error'] == 0) {
                    $image_tmp_path = $_FILES['user_image']['tmp_name'];
                    $zip->addFile($image_tmp_path, 'user-avatar.jpg');
                }
                
                $zip->close();

                // MASTER FIX: Ab tak ka saara buffer bilkul saaf kar do taaki headers force download kar sakein
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
        
        // ----------------- CONDITION B: NORMAL CONTACT FORM -----------------
        elseif (isset($_POST['fullname'])) {
            $name = $_POST['fullname'];
            $email = $_POST['email'];
            $phone = $_POST['mobile'];
            $subject = $_POST['subject'];
            $message = $_POST['message'];

            $sql = "INSERT INTO contact_messages (name, email, phone, subject, message) 
                    VALUES (:name, :email, :phone, :subject, :message)";
            
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                ':name' => $name,
                ':email' => $email,
                ':phone' => $phone,
                ':subject' => $subject,
                ':message' => $message
            ]);

            // Buffer clear karke script output dena
            if (ob_get_length()) ob_end_clean();

            echo "<script>
                    alert('Wow! Message successfully saved in Database, $name! 🙌');
                    window.location.href='index.html';
                  </script>";
            exit();
        }
    }
} catch (PDOException $e) {
    if (ob_get_length()) ob_end_clean();
    echo "Bhai, connection fail ho gaya: " . $e->getMessage();
}
// Janbujhkar closing tag hataya hai taaki extra spaces ka naamo-nishan na rahe