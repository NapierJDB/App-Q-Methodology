<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \Firebase\JWT\JWT;

require '../config/connection.php';

$app = new \Slim\App;
require '../config/routes.php';

require '../src/login.php';

require '../src/register.php';

$app->run();

function test() {
 echo "Test Test Test";
}
?>
