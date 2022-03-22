<?php
    include 'quizs.php';
    include 'view.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project1PHP: Quiz</title>

    <script type="text/javascript" src="js/jquery.js"></script>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="css/screen.css" type="text/css">
    

</head>
<body>
    <section class="sliderTarget container">

    </section>

    <section class="header ">
        <header class="p-3 bg-dark text-white">
            <div class="container">
                <h1 class="justify-content-center">Projet PHP n°1: QUIZ</h1>
                <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                        <img src ="img/logo.png" alt="logo du header" title="LOGO" class="logo-header">
                    </a>

                    <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <li><a href="#" class="nav-link px-2 text-secondary">Home</a></li>

                    </ul>

                    <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                        <input type="search" class="form-control form-control-dark" placeholder="Rechercher un quiz" aria-label="Search">

                    </form>
                    <button type="button" class="btn btn-outline-light me-2">Rechercher</button>
                    <div class="text-end">
                    <button type="button" class="btn btn-outline-light me-2">Login</button>
                    <button type="button" class="btn btn-warning">Sign-up</button>
                    </div>
                </div>
            </div>
        </header>
    </section> 
    
    <section class="container">


    </section>
    <section>
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <td>Titre du quiz</td>
                    <td>Illustration</td>
                    <td>Auteur</td>
                    <td>Nombre de questions</td>
                </tr>
            </thead>
            <tbody id="content">
            <?php
                $i = 0;
                foreach($quizs as $quiz) {
                    echo "<tr>";
                        echo "<td>";
                            echo "<a href='view.php?id=$i'>$quiz[Title]</a>";
                        echo "</td>";
                        echo "<td>";
                            echo "<img src='img/$i.jpg'>";
                        echo "</td>";
                        echo "<td>";
                            echo "<a>$quiz[Author]</a>";
                        echo "</td>";
                        echo "<td>";
                            echo count($quiz['Questions']);
                        echo "</td>";
                    echo "</tr>";
                    $i += 1;
                }
            ?>
            </tbody>
        </table>
    </section>
    <footer class="bg-dark">
        <div class="copyright">&copy; EPFC &dot; 2022</div>
        <a href="">Condition d'utilisation</a>
    </footer>
    <script type="text/javascript" src="js/main.js"></script>
    <script type="text/javascript" src="js/banner.js"></script>
</body>
</html>

