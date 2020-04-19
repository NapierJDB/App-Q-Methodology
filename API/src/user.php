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

            return $response->withJson(['research' => getResearch($data), 'anchors' => getAnchors($data), 'statements' => getStatements($data)]);

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
function sendResults(Request $request, Response $response)
{
    $data = json_decode($request->getBody());

    if (isset($data->array) && isset($data->array->researchID) && isset($data->array->statements) && isset($data->array->email) && isset($data->array->answers)) {

        try {

            // return $response->withJson(addUser($data));

            $userID = addUser($data);

            $researchID = $data->array->researchID;

            if (checkResults($userID, $researchID)) {

                return $response->withJson(['error' => true, 'message' => 'Your results have already been submitted!']);

            } else {

                addResults($data, $userID);

                addQanswers($data, $userID);

                return $response->withJson(['error' => false, 'message' => 'Results have been successfully added!']);

            }

        } catch (PODException $e) {

            return $response->withJson(['error' => true, 'message' => $e->getMessage()]);

        }

        //return $response->withJson(['error' => false, 'data' => $data]);

    } else {

        return $response->withJson(['error' => true, 'message' => 'Missing attributes in JSON string. (array: {researchID: {}, statements: [{},{},{}], answers: [{},{},{}], email: {}})']);

    }
}
// check if user's email already exists
function checkUser($data)
{

    $sql = "SELECT * FROM users WHERE email = :email";

    $db = connect();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("email", $data->array->email);
    $stmt->execute();
    $object = $stmt->fetchObject();

    return $object;

}
//  if user not exists: add user and return id, else return users id
function addUser($data)
{

    $object = checkUser($data);

    if (!$object) {

        $sql = "INSERT INTO users (email) VALUES (:email)";
        $db = connect();
        $stmt = $db->prepare($sql);
        $stmt->bindParam('email', $data->array->email);
        $stmt->execute();

        $id = $db->lastInsertId();

        return $id;

    } else {

        return $object->id;

    }

}

function checkResults($userID, $researchID)
{

    $sql = "SELECT * FROM results WHERE userID = :userID AND researchID = :researchID";

    $db = connect();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("userID", $userID);
    $stmt->bindParam("researchID", $researchID);
    $stmt->execute();
    $object = $stmt->fetchObject();

    return $object;
}

function addResults($data, $userID)
{

    $sql = "INSERT INTO results (statementNum, markerNum, userID, researchID) VALUES (:statementNum, :markerNum, :userID, :researchID)";

    $db = connect();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("userID", $userID);
    $stmt->bindParam("researchID", $data->array->researchID);

    foreach ($data->array->statements as $result) {

        $stmt->bindParam("statementNum", $result->statement);
        $stmt->bindParam("markerNum", $result->markerNum);
        $stmt->execute();

    }

}

function addQanswers($data, $userID)
{

    $sql = "INSERT INTO q_answers (q_number, answer, userID, researchID) VALUES (:q_number, :answer, :userID, :researchID)";

    $db = connect();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("userID", $userID);
    $stmt->bindParam("researchID", $data->array->researchID);

    foreach ($data->array->answers as $result) {

        if (isset($result->q_number) && isset($result->answer)) {
            $stmt->bindParam("q_number", $result->q_number);
            $stmt->bindParam("answer", $result->answer);
            $stmt->execute();
        }
    }

}
