<?php
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;

//Register researcher
function addResearch(Request $request, Response $response)
{
    $response->getBody()->write('Test'); // test response

/*     require_once '../config/connection.php';

    $id = $request->getParam('id');

    if (!$id) {

        return $response->withJson(['error' => true, 'message' => 'Missing parameter in URL string. (forename, surname, email and password required']);

    } else {

        $sql = "";

        try {

            $db = connect();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("id", $id);
            $stmt->execute();

            return $response->withJson(['error' => false, 'message' => 'The Research has been successfully created']);

        } catch (PDOException $e) {

            return $response->withJson(['error' => true, 'message' => $e->getMessage()]);

        }

    } */

}
