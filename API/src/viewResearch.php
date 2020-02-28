<?php
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\StreamInterface;

//View researcher

function viewResearch(Request $request, Response $response)
{
    require_once '../config/connection.php';

    $data = json_decode($request->getBody());

    if (isset($data->researcherID)) {

        $sql = "SELECT * FROM research WHERE researcherID = :researcherID";

        $db = connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("researcherID", $data->researcherID);
        $stmt->execute();
        $object = $stmt->fetchObject();

        return $response->withJson($object);

    } else {

        return $response->withJson(['error' => true, 'message' => 'Missing attributes in JSON string. (researcherID)']);

    }

}
