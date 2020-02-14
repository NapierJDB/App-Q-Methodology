<?php
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;

function activate(Request $request, Response $response, $args)
{

    require_once '../config/connection.php';

    $token = $request->getParam('token');

    $object = checkToken($token);

    if ($object) {

        if ($object->isActive == 0) {

            $sql = "UPDATE registration SET isActive = 1 WHERE token = :token";

            try {

                $db = connect();
                $stmt = $db->prepare($sql);
                $stmt->bindParam("token", $token);
                $stmt->execute();

                echo "
                <h1>Thank You</h1>
                <p> Your account has been activated! </p>
                <p> Please follow the link and log into your account</p>
                <p> link <react.js login page></p>
                ";

            } catch (PDOException $e) {

                return $response->withJson(['error' => true, 'message' => $e->getMessage()]);

            }
        } else {

            return $response->withJson(['error' => true, 'message' => 'Acccount has already been activated']);

        }

    } else {

        return $response->withJson(['error' => true, 'message' => 'Account does not exist']);

    }
}
// check if token exists
function checkToken($token)
{

    $sql = "SELECT * FROM registration WHERE token = :token";

    $db = connect();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("token", $token);
    $stmt->execute();
    $object = $stmt->fetchObject();

    return $object;

}
