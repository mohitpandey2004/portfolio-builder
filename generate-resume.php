<?php
// Sabse pehli line par bina kisi space ke ob_start chalana hai taaki buffers break na hon
ob_start();

// ==================== 1. POSTGRESQL ONLINE CONFIG ====================
$host = "dpg-d8al6bu7r5hc73ehhmv0-a.oregon-postgres.render.com";
$port = "5432";               
$dbname = "mohit_portfolio";   
$user = "mohit";           
$password = "ejAM4ZN2L5XitWL8d183Kk5fgOXygVzM";  

try {
    // Secure Render Connection Parameter with SSL Mode
    $dsn = "pgsql:host=$host;port=$port;dbname=$dbname;user=$user;password=$password;sslmode=require";
    $pdo = new PDO($dsn);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        
        $name = htmlspecialchars($_POST['res_name'] ?? 'Your Name');
        $title = htmlspecialchars($_POST['res_title'] ?? 'Professional Title');
        $email = htmlspecialchars($_POST['res_email'] ?? 'email@example.com');
        $phone = htmlspecialchars($_POST['res_phone'] ?? '1234567890');
        $address = htmlspecialchars($_POST['res_address'] ?? 'Location');
        
        // Exact matching for line breaks form textareas
        $education = nl2br(htmlspecialchars($_POST['res_education'] ?? ''));
        $projects = nl2br(htmlspecialchars($_POST['res_projects'] ?? ''));
        $experience = nl2br(htmlspecialchars($_POST['res_experience'] ?? ''));
        $skills_raw = htmlspecialchars($_POST['res_skills'] ?? '');
        
        // Catch specific layout selection id (51, 52, 53, 54)
        $template = isset($_POST['chosen_template']) ? $_POST['chosen_template'] : '51';

        // Skills array loop conversion
        $skills_array = explode(',', $skills_raw);
        $skills_html = "";
        foreach ($skills_array as $skill) {
            if(!empty(trim($skill))) {
                $skills_html .= '<span class="skill-badge tpl-badge-' . $template . '">' . trim($skill) . '</span>';
            }
        }

        // Process secure base64 image data parsing
        $avatar_data = "";
        if (isset($_FILES['res_image']) && $_FILES['res_image']['error'] == 0) {
            $image_path = $_FILES['res_image']['tmp_name'];
            $base64 = base64_encode(file_get_contents($image_path));
            $avatar_data = 'data:' . $_FILES['res_image']['type'] . ';base64,' . $base64;
        }

        // Clean output buffers just before injecting direct HTML response
        if (ob_get_length()) {
            ob_end_clean();
        }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Resume View - <?php echo $name; ?></title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Arial', sans-serif; }
        body { background: #f8fafc; color: #1e293b; padding: 20px; }
        
        .print-bar { background: #0f172a; padding: 15px; text-align: center; max-width: 820px; margin: 0 auto 20px auto; border-radius: 8px; }
        .print-btn { background: #00eeff; color: #000; border: none; padding: 10px 24px; font-weight: bold; border-radius: 4px; cursor: pointer; text-transform: uppercase; }
        .print-btn:hover { box-shadow: 0 0 15px #00eeff; }

        /* A4 Core Absolute Canvas Settings */
        .resume-sheet { background: #fff; max-width: 820px; margin: 0 auto; min-height: 297mm; padding: 45px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); position: relative;}
        
        .content-block { font-size: 13px; color: #334155; margin-bottom: 15px; line-height: 1.6; text-align: justify; }
        
        /* ==================== STYLE CONFIG 51: CORPORATE BLUE ==================== */
        <?php if($template == '51'): ?>
        .header-51 { background: #1a365d; color: #fff; padding: 30px; margin: -45px -45px 30px -45px; display: flex; align-items: center; justify-content: space-between; }
        .header-51 h1 { font-size: 28px; text-transform: uppercase; letter-spacing: 1px; }
        .header-51 p { color: #00eeff; font-size: 14px; font-weight: 600; margin-top: 5px; }
        .container-51 { display: grid; grid-template-columns: 32% 68%; gap: 25px; }
        .sec-title-51 { color: #1a365d; font-size: 14px; font-weight: bold; border-bottom: 2px solid #1a365d; padding-bottom: 3px; margin-bottom: 12px; margin-top: 15px; text-transform: uppercase; }
        .skill-badge.tpl-badge-51 { background: #f1f5f9; color: #1a365d; border: 1px solid #cbd5e1; font-size: 11px; padding: 4px 8px; margin: 3px; display: inline-block; border-radius: 3px; font-weight: 600; }
        .avatar-51 { width: 100px; height: 100px; border-radius: 50%; border: 3px solid #fff; overflow: hidden; }
        .avatar-51 img { width: 100%; height: 100%; object-fit: cover; }
        .contact-51 { font-size: 12.5px; color: #475569; margin-bottom: 8px; }
        <?php endif; ?>

        /* ==================== STYLE CONFIG 52: GOLD MINIMALIST ==================== */
        <?php if($template == '52'): ?>
        .container-52 { display: grid; grid-template-columns: 30% 70%; gap: 30px; }
        .left-col-52 { background: #fcfbf7; margin: -45px 0 -45px -45px; padding: 45px 20px; border-right: 1px solid #e5e5e0; }
        .sec-title-52 { color: #bc9c22; font-size: 13px; font-weight: bold; border-bottom: 1px solid #bc9c22; padding-bottom: 4px; margin-bottom: 15px; margin-top: 25px; text-transform: uppercase; letter-spacing: 1px; }
        .name-52 { color: #111; font-size: 26px; font-weight: 300; text-transform: uppercase; }
        .title-52 { color: #bc9c22; font-size: 14px; font-weight: 600; text-transform: uppercase; margin-bottom: 20px; }
        .skill-badge.tpl-badge-52 { background: #bc9c22; color: #fff; font-size: 11px; padding: 3px 8px; margin: 3px; display: inline-block; border-radius: 2px; }
        .avatar-52 { width: 110px; height: 110px; border-radius: 50%; border: 2px solid #bc9c22; overflow: hidden; margin-bottom: 20px; }
        .avatar-52 img { width: 100%; height: 100%; object-fit: cover; }
        <?php endif; ?>

        /* ==================== STYLE CONFIG 53: DARK SIDEBAR ACCENT ==================== */
        <?php if($template == '53'): ?>
        .container-53 { display: grid; grid-template-columns: 33% 67%; gap: 30px; }
        .left-col-53 { background: #1e293b; color: #f8fafc; margin: -45px 0 -45px -45px; padding: 45px 25px; }
        .sec-title-53 { color: #38bdf8; font-size: 14px; font-weight: bold; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 5px; margin-bottom: 12px; margin-top: 25px; text-transform: uppercase; }
        .sec-title-right-53 { color: #0f172a; font-size: 14px; font-weight: bold; border-bottom: 2px solid #0f172a; padding-bottom: 3px; margin-bottom: 12px; margin-top: 20px; text-transform: uppercase; }
        .name-53 { font-size: 28px; color: #0f172a; font-weight: bold; text-transform: uppercase; }
        .title-53 { color: #475569; font-size: 15px; font-weight: 600; margin-bottom: 20px; }
        .skill-badge.tpl-badge-53 { background: rgba(255,255,255,0.1); color: #38bdf8; font-size: 11px; padding: 4px 8px; margin: 3px; display: inline-block; border-radius: 4px; }
        .avatar-53 { width: 110px; height: 110px; border-radius: 50%; border: 2px solid #38bdf8; overflow: hidden; margin-bottom: 25px; }
        .avatar-53 img { width: 100%; height: 100%; object-fit: cover; }
        <?php endif; ?>

        /* ==================== STYLE CONFIG 54: NEON CYBER CLEAN ==================== */
        <?php if($template == '54'): ?>
        .header-54 { border-left: 6px solid #00eeff; padding-left: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center;}
        .name-54 { font-size: 32px; color: #0f172a; font-weight: 800; text-transform: uppercase; }
        .title-54 { color: #ff007f; font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
        .sec-title-54 { color: #0f172a; font-size: 14px; font-weight: bold; background: #f1f5f9; padding: 6px 12px; margin-bottom: 12px; margin-top: 25px; text-transform: uppercase; border-radius: 4px; display: flex; align-items: center; gap: 8px;}
        .skill-badge.tpl-badge-54 { background: #0f172a; color: #00eeff; font-size: 11px; padding: 5px 12px; margin: 4px; display: inline-block; border-radius: 20px; font-weight: 600;}
        .avatar-54 { width: 90px; height: 90px; border-radius: 8px; border: 2px solid #ff007f; overflow: hidden; }
        .avatar-54 img { width: 100%; height: 100%; object-fit: cover; }
        .contact-grid-54 { display: flex; flex-wrap: wrap; gap: 15px; font-size: 12.5px; color: #475569; margin-top: 8px; }
        <?php endif; ?>

        @media print { body { background: #fff; padding: 0; } .no-print { display: none; } .resume-sheet { box-shadow: none; padding: 45px; } }
    </style>
</head>
<body>

    <div class="print-bar no-print">
        <span style="color:#fff; margin-right: 20px;">👀 Layout Preview Panel (Template <?php echo $template; ?>)</span>
        <button class="print-btn" onclick="window.print()">Print / Save PDF</button>
    </div>

    <div class="resume-sheet">
        
        <?php if($template == '51'): ?>
            <div class="header-51">
                <div>
                    <h1><?php echo $name; ?></h1>
                    <p><?php echo $title; ?></p>
                </div>
                <?php if(!empty($avatar_data)): ?>
                    <div class="avatar-51"><img src="<?php echo $avatar_data; ?>"></div>
                <?php endif; ?>
            </div>
            <div class="container-51">
                <div class="left-col">
                    <div class="sec-title-51">Contact</div>
                    <div class="contact-51"><strong>Email:</strong><br><?php echo $email; ?></div>
                    <div class="contact-51"><strong>Phone:</strong><br><?php echo $phone; ?></div>
                    <div class="contact-51"><strong>Location:</strong><br><?php echo $address; ?></div>
                    
                    <div class="sec-title-51">Skills</div>
                    <div style="margin-top: 5px;"><?php echo $skills_html; ?></div>
                </div>
                <div class="right-col">
                    <div class="sec-title-51">Work Experience</div>
                    <div class="content-block"><?php echo $experience; ?></div>
                    <div class="sec-title-51">Projects</div>
                    <div class="content-block"><?php echo $projects; ?></div>
                    <div class="sec-title-51">Education</div>
                    <div class="content-block"><?php echo $education; ?></div>
                </div>
            </div>
        <?php endif; ?>

        <?php if($template == '52'): ?>
            <div class="container-52">
                <div class="left-col-52">
                    <?php if(!empty($avatar_data)): ?>
                        <div class="avatar-52"><img src="<?php echo $avatar_data; ?>"></div>
                    <?php endif; ?>
                    <div class="sec-title-52" style="margin-top: 0;">Contact</div>
                    <div class="content-block" style="font-size:12px; color:#555;">
                        <strong>Email:</strong><br><?php echo $email; ?><br><br>
                        <strong>Phone:</strong><br><?php echo $phone; ?><br><br>
                        <strong>Location:</strong><br><?php echo $address; ?>
                    </div>
                    <div class="sec-title-52">Skills</div>
                    <div><?php echo $skills_html; ?></div>
                </div>
                <div class="right-col-52">
                    <div class="name-52"><?php echo $name; ?></div>
                    <div class="title-52"><?php echo $title; ?></div>
                    
                    <div class="sec-title-52">Experience</div>
                    <div class="content-block"><?php echo $experience; ?></div>
                    <div class="sec-title-52">Projects</div>
                    <div class="content-block"><?php echo $projects; ?></div>
                    <div class="sec-title-52">Education</div>
                    <div class="content-block"><?php echo $education; ?></div>
                </div>
            </div>
        <?php endif; ?>

        <?php if($template == '53'): ?>
            <div class="container-53">
                <div class="left-col-53">
                    <?php if(!empty($avatar_data)): ?>
                        <div class="avatar-53"><img src="<?php echo $avatar_data; ?>"></div>
                    <?php endif; ?>
                    <div class="sec-title-53" style="margin-top:0;">Contact Details</div>
                    <div class="content-block" style="color: #cbd5e1; font-size:12.5px;">
                        <p style="margin-bottom:8px;"><i class="fa-solid fa-envelope"></i> <?php echo $email; ?></p>
                        <p style="margin-bottom:8px;"><i class="fa-solid fa-phone"></i> <?php echo $phone; ?></p>
                        <p><i class="fa-solid fa-location-dot"></i> <?php echo $address; ?></p>
                    </div>
                    <div class="sec-title-53">Expertise</div>
                    <div><?php echo $skills_html; ?></div>
                </div>
                <div class="right-col-53">
                    <div class="name-53"><?php echo $name; ?></div>
                    <div class="title-53"><?php echo $title; ?></div>
                    
                    <div class="sec-title-right-53">Professional Timeline</div>
                    <div class="content-block"><?php echo $experience; ?></div>
                    <div class="sec-title-right-53">Key Projects</div>
                    <div class="content-block"><?php echo $projects; ?></div>
                    <div class="sec-title-right-53">Education</div>
                    <div class="content-block"><?php echo $education; ?></div>
                </div>
            </div>
        <?php endif; ?>

        <?php if($template == '54'): ?>
            <div class="header-54">
                <div>
                    <div class="name-54"><?php echo $name; ?></div>
                    <div class="title-54"><?php echo $title; ?></div>
                    <div class="contact-grid-54">
                        <span><i class="fa-solid fa-envelope" style="color:#ff007f;"></i> <?php echo $email; ?></span>
                        <span><i class="fa-solid fa-phone" style="color:#ff007f;"></i> <?php echo $phone; ?></span>
                        <span><i class="fa-solid fa-location-dot" style="color:#ff007f;"></i> <?php echo $address; ?></span>
                    </div>
                </div>
                <?php if(!empty($avatar_data)): ?>
                    <div class="avatar-54"><img src="<?php echo $avatar_data; ?>"></div>
                <?php endif; ?>
            </div>
            
            <div class="sec-title-54"><i class="fa-solid fa-brain" style="color:#ff007f;"></i> Core Technologies</div>
            <div style="margin-bottom:15px;"><?php echo $skills_html; ?></div>
            
            <div class="sec-title-54"><i class="fa-solid fa-history" style="color:#ff007f;"></i> Work Experience</div>
            <div class="content-block"><?php echo $experience; ?></div>
            
            <div class="sec-title-54"><i class="fa-solid fa-code-branch" style="color:#ff007f;"></i> Featured Projects</div>
            <div class="content-block"><?php echo $projects; ?></div>
            
            <div class="sec-title-54"><i class="fa-solid fa-graduation-cap" style="color:#ff007f;"></i> Academic Qualifications</div>
            <div class="content-block"><?php echo $education; ?></div>
        <?php endif; ?>

    </div>

</body>
</html>
<?php
        exit();
    }
} catch (PDOException $e) {
    if (ob_get_length()) ob_end_clean();
    echo "Bhai, Connection failed in Resume Engine: " . $e->getMessage();
}
?>