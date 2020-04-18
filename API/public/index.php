<?php

require '../vendor/autoload.php';

require '../config/connection.php';

$app = new \Slim\App;

require '../config/routes.php';

require '../src/login.php';

require '../src/register.php';

require '../src/activate.php';

require '../src/research.php';

require '../src/anchor.php';

require '../src/statement.php';

require '../src/question.php';

require '../src/user.php';

require '../src/saveFile.php';

require '../src/deleteUser.php';



$app->run();

?>
