<?php
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;

//Add research
function addResearch(Request $request, Response $response)
{

    // return $response->withJson(['error' => false, 'message' => generateCode()]); // test response

    require_once '../config/connection.php';

    $data = json_decode($request->getBody());
    $code = generateCode();
    $date = date('Y-m-d');

    if (isset($data->researcherID) && isset($data->name) && isset($data->description) && isset($data->box1) && isset($data->box2) && isset($data->box3)) {

        $object = checkName($data);

        if (!$object) {

            $sql = "INSERT INTO research (name, description, box1, box2, box3, code, created_date, researcherID) VALUES (:name, :description, :box1, :box2, :box3, :code, :created_date, :researcherID)";

            try {

                $db = connect();
                $stmt = $db->prepare($sql);
                $stmt->bindParam("researcherID", $data->researcherID);
                $stmt->bindParam("name", $data->name);
                $stmt->bindParam("description", $data->description);
                $stmt->bindParam("box1", $data->box1);
                $stmt->bindParam("box2", $data->box2);
                $stmt->bindParam("box3", $data->box3);
                $stmt->bindParam("code", $code);
                $stmt->bindParam("created_date", $date);

                $stmt->execute();

                return $response->withJson(['error' => false, 'message' => 'The Research has been successfully created']);

            } catch (PDOException $e) {

                return $response->withJson(['error' => true, 'message' => $e->getMessage()]);

            }

        } else {

            return $response->withJson(['error' => true, 'message' => 'The research already exists']);

        }

    } else {

        return $response->withJson(['error' => true, 'message' => 'Missing attributes in JSON string. (researcherID, name, description, box1, box2 and box3 required)']);

    }

}
//Generate access code
function generateCode()
{

    $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $randomStr = '';
    $strLength = 1;

    for ($i = 0; $i < $strLength; $i++) {

        $index = rand(0, strlen($characters) - 1);
        $randomStr .= $characters[$index];
        $randomStr = 'Q' . $randomStr . date("is");

    }

    return $randomStr;

}
//Check if research already exists
function checkName($data)
{

    $sql = "SELECT * FROM research WHERE name = :name";

    $db = connect();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("name", $data->name);
    $stmt->execute();
    $object = $stmt->fetchObject();

    return $object;

}
