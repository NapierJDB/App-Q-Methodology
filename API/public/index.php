<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';

require '../config/connection.php';

$app = new \Slim\App;

require '../config/routes.php';

require '../src/login.php';

require '../src/register.php';

require '../src/activate.php';

require '../src/research.php';

require '../src/anchor.php';

$app->run();

?>
