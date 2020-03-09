<?php
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;

function checkCode(Request $request, Response $response)
{

    $data = json_decode($request->getBody());

    if (isset($data->code)) {

        $sql = "SELECT * FROM research WHERE code = :code";

        try {

            $db = connect();
            $stmt = $db->prepare($sql);
            $stmt->bindParam('code', $data->code);
            $stmt->execute();

            $object = $stmt->fetchObject();

            if (!$object) {

                return $response->withJson(['error' => true, 'message' => 'Please enter valid code']);

            } else {

                $tokenUser = generateTokenAdmin($object);

                return $response->withJson(['error' => false, 'id' => $object->id, 'token' => $tokenUser]);

            }

        } catch (PDOException $e) {

            return $response->withJson(['error' => true, 'message' => $e->getMessage()]);

        }

    } else {

        return $response->withJson(['error' => true, 'message' => 'Missing attributes in JSON string. (code)']);

    }

}

function generateTokenUser($object)
{

    $key = "sdfgd&&£2Q!1asDASDFFAs&(sdfsdfg;'#;!£^&asfsadf"; //needs to be stored in database

    $payload = [
        "iss" => "qmethodology", //issuer
        //"aud" => " " //audience
        "jti" => "QMET"+time(), //unique identifier
        "exp" => time() + 7200, // expiartion
        "iat" => time(), // the time it was issued

        "data" => [
            "id" => $object->id,
            "forename" => $object->name,
            "surname" => $object->created_date,
        ],
    ];

    $token = JWT::encode($payload, $key);

    return $token;

}

function getData(Request $request, Response $response)
{

    $data = json_decode($request->getBody());

    if (isset($data->id)) {

        $object = checkResearchId($data); //research.php

        if ($object) {

            return $response->withJson(['research'=> getResearch($data), 'anchors' => getAnchors($data),'statements'=> getStatements($data)]);

        } else {

            return $response->withJson(['error' => true, 'message' => 'The research does not exist']);

        }

    } else {

        return $response->withJson(['error' => true, 'message' => 'Missing attributes in JSON string. (id)']);

    }

}

function getResearch($data)
{

    $sql = "SELECT name,description, box1, box2, box3, privacy_statement, debrief FROM research WHERE id = :id";

    try {

        $db = connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam('id', $data->id);
        $stmt->execute();
        $object = $stmt->fetch(PDO::FETCH_OBJ);

        return $object;

    } catch (PODException $e) {

        return array('error' => true, 'message' => $e->getMessage());

    }

}

function getAnchors($data)
{

    $sql = "SELECT markerNum, items FROM anchors WHERE researchID = :researchID ORDER BY  markerNum ASC";

    try {

        $db = connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam('researchID', $data->id);
        $stmt->execute();
        $object = $stmt->fetchAll(PDO::FETCH_OBJ);

        return $object;

    } catch (PODException $e) {

        return array('error' => true, 'message' => $e->getMessage());

    }

}

function getStatements($data)
{

    $sql = "SELECT number, description FROM q_sort_cards WHERE researchID = :researchID ORDER BY number ASC";

    try {

        $db = connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam('researchID', $data->id);
        $stmt->execute();
        $object = $stmt->fetchAll(PDO::FETCH_OBJ);

        return $object;

    } catch (PODException $e) {

        return array('error' => true, 'message' => $e->getMessage());

    }

}